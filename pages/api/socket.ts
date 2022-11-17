import { Server, Socket } from "socket.io";
import { EVENTS } from "../../enums/events";
import RoomHandler from "../../libs/roomHandler";
import { customAlphabet } from "nanoid";
import Room from "../../modules/sockets/classes/Room";
import prisma from "../../libs/prisma";
import { ICharacter } from "../../interfaces/entities";
import { IMessage } from "../../interfaces/game";
import { EMessages } from "../../enums/messages";
import { findSubs } from "../../utils/findSubs";
import { findSums } from "../../utils/findSums";
import { findDices } from "../../utils/findDices";
import { throwDice } from "../../utils/throwDice";

const genId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

export default function handler(req: any, res: any) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = async (socket: Socket) => {
    socket.on(EVENTS.CREATE_ROOM, ({ password }) => {
      const id = genId(8);

      const room = new Room(id, password, socket);

      RoomHandler.rooms.set(id, room);
      RoomHandler.socketRooms.set(socket, room);

      socket.emit(EVENTS.CONNECTED_TO_ROOM, room.get());
    });

    socket.on(EVENTS.JOIN_ROOM, async ({ id, password, characterId }) => {
      const room = RoomHandler.rooms.get(id);

      if (!room) throw Error("Not Found");

      let character = (await prisma.character.findUnique({
        where: {
          id: characterId,
        },
      })) as ICharacter;

      if (!character) throw Error("Character not found");

      character.currentHp = character.hitPoints;
      character.death_throws = [null, null, null];

      const joinResult = await room.join(socket, password, character);

      if (!joinResult) return false;

      RoomHandler.socketRooms.set(socket, room);

      io.sockets.in(room.id).emit(EVENTS.CONNECTED_TO_ROOM, room.get());
    });

    socket.on(EVENTS.UPDATE_CHARACTER, ({ id, payload }) => {
      const room = RoomHandler.socketRooms.get(socket);

      if (!room) return false;

      room.updateCharacter(id, payload);

      io.sockets.in(room.id).emit(EVENTS.REFRESH_UI, room.get());
    });

    socket.on(EVENTS.SEND_MESSAGE, (message: string) => {
      const room = RoomHandler.socketRooms.get(socket);

      if (!room) return false;

      let messageObj: IMessage = {
        role:
          room.dungeonMaster?.id === socket.id
            ? EMessages.DM
            : EMessages.PLAYER,
        message,
      };

      if (messageObj.role === EMessages.PLAYER) {
        messageObj.name = room.players.get(socket.id)?.name;
        messageObj.thumbnail = room.players.get(socket.id)?.picture;
      }

      io.sockets.in(room.id).emit(EVENTS.MESSAGE, messageObj);
    });

    socket.on(EVENTS.THROW_DICE, (args: string) => {
      const room = RoomHandler.socketRooms.get(socket);

      if (!room) return false;

      const sums = findSums(args);
      const subs = findSubs(args);
      const dices = findDices(args);

      let result = 0;
      let resultString = "";
      let tmp = args;

      dices.forEach((dice, index) => {
        const [amount, faces] = dice.replace("-", "").split("d");
        const throwResult = throwDice(parseInt(amount), parseInt(faces));

        let formattedResult = ` (${throwResult.join(",")})`;

        let start = tmp.search(dice) + dice.length;
        let head = tmp.slice(0, start);
        let tail = tmp.slice(start);

        resultString += head + formattedResult;
        tmp = tail;

        if (index === dices.length - 1) resultString += tail;

        result += throwResult.reduce(
          (prev, curr) => (dice.startsWith("-") ? prev - curr : prev + curr),
          0
        );
      });

      result += [...sums, ...subs].reduce((prev, curr) => prev + curr, 0);

      let messageObj: IMessage = {
        role: EMessages.BOT,
        message: `${args}:  ${resultString} \n Total: ${result}`,
      };

      io.sockets.in(room.id).emit(EVENTS.MESSAGE, messageObj);
    });

    socket.on(EVENTS.DISCONNECTING, () => {
      const room = RoomHandler.socketRooms.get(socket);

      if (!room) return;

      if (room.dungeonMaster?.id !== socket.id) {
        const character = room.players.get(socket.id);

        room.players.delete(socket.id);
        RoomHandler.socketRooms.delete(socket);

        let messageObj: IMessage = {
          role: EMessages.BOT,
          message: `${character?.name} ha salido de la sala`,
        };

        io.sockets.in(room.id).emit(EVENTS.USER_LEFT, messageObj);
        io.sockets.in(room.id).emit(EVENTS.REFRESH_UI, room.get());
      } else {
        let messageObj: IMessage = {
          role: EMessages.BOT,
          message: `El dungeon master ha abandonado la sala. Todos serán expulsados en 3 segundos`,
        };

        setTimeout(() => {
          RoomHandler.rooms.delete(room.id);
          RoomHandler.socketRooms.delete(socket);
          io.sockets.in(room.id).disconnectSockets();
        }, 3000);

        io.sockets.in(room.id).emit(EVENTS.DM_LEFT, messageObj);
      }
    });
  };

  io.on("connection", onConnection);

  res.end();
  return;
}
