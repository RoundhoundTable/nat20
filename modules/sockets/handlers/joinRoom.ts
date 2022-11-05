import { Socket } from "socket.io";
import prisma from "../../../libs/prisma";
import SocketHandler from "../../../libs/socket";

async function joinRoom(
  this: Socket,
  args: { id: string; password: string; characterId: string }
) {
  const room = SocketHandler.rooms.get(args.id);
  if (!room) throw Error("Not Found");

  const user = this.handshake.auth;

  if (!user) throw new Error("Forbidden");

  const character = await prisma.character.findFirst({
    where: {
      id: args.characterId,
    },
  });

  if (!character) throw new Error("Character not found!");

  const joinResult = room.join(this, args.password, character);

  if (!joinResult) return false;

  SocketHandler.socketRooms.set(this, room);

  this.emit("roomConnected", { room: room.id, isDm: false });
}

export default joinRoom;
