import { Socket } from "socket.io";
import SocketHandler from "../../../libs/socket";
import Room from "../classes/Room";
import { customAlphabet } from "nanoid";

const genId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
);

async function createRoom(this: Socket, password: string) {
  const id = genId(8);
  const user = this.handshake.auth;

  if (!user) throw new Error("Forbidden");

  const room = new Room(id, password);

  room.joinAsDm(this);

  SocketHandler.rooms.set(id, room);
  SocketHandler.socketRooms.set(this, room);

  this.emit("roomConnected", { room: room.id, isDm: true });
}

export default createRoom;
