import { createContext, ReactNode, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { ISocketContext } from "../interfaces/context";
import { useAuth } from "../hooks/useAuth";
import useGame from "../hooks/useGame";

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const gameContext = useGame();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const initializeSocket = async () => {
    await fetch("/api/socket");
    const _socket = io();

    _socket.on("roomConnected", (args) => {
      gameContext.setIsDm(args.isDm);
      gameContext.setRoomId(args.room);
    });

    setSocket(_socket);
  };

  const createRoom = (password: string) => {
    if (currentUser && socket) socket.emit("createRoom", password);
  };

  const joinRoom = (id: string, password: string) => {
    if (currentUser && socket) socket.emit("joinRoom", { id, password });
  };

  const value = {
    socket,
    initializeSocket,
    joinRoom,
    createRoom,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
