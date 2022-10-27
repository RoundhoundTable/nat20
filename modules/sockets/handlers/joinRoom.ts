import { Socket } from "socket.io";
import prisma from "../../../libs/prisma";
import SocketHandler from "../../../libs/socket";

async function joinRoom(this: Socket, args: { id: string; password: string }) {
  const room = SocketHandler.rooms.get(args.id);
  if (!room) throw Error("Not Found");

  const user = this.handshake.auth;
  const character = await prisma.campaignCharacter.findFirst({
    where: {
      campaign: room.campaign,
      character: {
        userId: user.uid,
      },
    },
    include: {
      character: true,
    },
  });

  if (!character) return;

  const joinResult = room.join(this, args.password, character);

  if (!joinResult) return false;

  SocketHandler.socketRooms.set(this, room);

  this.emit("roomConnected", `/game/${room.id}`);
}

export default joinRoom;
