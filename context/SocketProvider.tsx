import { createContext, ReactNode, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { ISocketContext } from "../interfaces/context";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const initializeSocket = async () => {
    await fetch("/api/socket");
    const _socket = io();

    setSocket(_socket);
  };

  const createRoom = (campaignId: string) => {
    if (currentUser && socket) socket.emit("createRoom", campaignId);
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
