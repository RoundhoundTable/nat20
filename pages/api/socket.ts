import { Server, Socket } from "socket.io";
import createRoom from "../../modules/sockets/handlers/createRoom";
import disconnect from "../../modules/sockets/handlers/disconnect";
import joinRoom from "../../modules/sockets/handlers/joinRoom";

export default function handler(req: any, res: any) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = async (socket: Socket) => {
    socket.on("joinRoom", joinRoom);
    socket.on("createRoom", createRoom);
    socket.on("sendMessage", () => {});
    socket.on("newMessage", () => {});
    socket.on("disconnect", disconnect);
  };

  io.on("connection", onConnection);

  res.end();
  return;
}
