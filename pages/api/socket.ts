import { Server, Socket } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);

  const onConnection = (socket: Socket) => {
    console.log("Socket Connected!");
  };

  io.on("connection", onConnection);

  res.end();
};

export default SocketHandler;
