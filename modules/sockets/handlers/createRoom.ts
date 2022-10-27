import { Socket } from "socket.io";
import SocketHandler from "../../../libs/socket";
import Room from "../classes/Room";
import { customAlphabet } from "nanoid";
import prisma from "../../../libs/prisma";
const genId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

async function createRoom(this: Socket, campaignId: string) {
  const id = genId(8);
  const user = this.handshake.auth;

  const campaign = await prisma.campaign.findFirst({
    where: {
      dungeonMasterId: user.uid,
      id: campaignId,
    },
  });

  if (!campaign) throw new Error("Campaign Not Found");

  const room = new Room(id, campaign);

  room.joinAsDm(this);

  SocketHandler.rooms.set(id, room);
  SocketHandler.socketRooms.set(this, room);

  console.log({ roomId: room.id });

  return true;
}

export default createRoom;
