import { Socket } from "socket.io";
import SocketHandler from "../../../libs/socket";

function disconnect(this: Socket) {
  const room = SocketHandler.socketRooms.get(this);

  if (room) {
    room.disconnect(this);
    SocketHandler.socketRooms.delete(this);
  }
}

export default disconnect;
