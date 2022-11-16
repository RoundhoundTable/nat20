import { Server, Socket } from "socket.io";
import { EVENTS } from "../../enums/events";
import RoomHandler from "../../libs/roomHandler";
import { customAlphabet } from "nanoid";
import Room from "../../modules/sockets/classes/Room";
import prisma from "../../libs/prisma";
import { ICharacter } from "../../interfaces/entities";
import { IMessage } from "../../interfaces/game";
import { EMessages } from "../../enums/messages";

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

    socket.on(EVENTS.DISCONNECTING, () => {
      const room = RoomHandler.socketRooms.get(socket);

      if (!room) return;

      const character = room.players.get(socket.id);

      room.players.delete(socket.id);
      RoomHandler.socketRooms.delete(socket);

      let messageObj: IMessage = {
        role: EMessages.BOT,
        message: `${character?.name} ha salido de la sala`,
      };

      io.sockets.in(room.id).emit(EVENTS.USER_LEFT, messageObj);
      io.sockets.in(room.id).emit(EVENTS.REFRESH_UI, room.get());
    });
  };

  io.on("connection", onConnection);

  res.end();
  return;
}
