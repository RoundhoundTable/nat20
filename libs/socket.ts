import { Socket } from "socket.io";
import Room from "../modules/sockets/classes/Room";

class SocketHandler {
  public static readonly rooms = new Map<string, Room>();
  public static readonly socketRooms = new Map<Socket, Room>();
}

export default SocketHandler;
