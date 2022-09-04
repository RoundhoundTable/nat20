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

    setSocket(
      io({
        auth: {
          ...currentUser,
        },
      })
    );
  };

  const value = {
    socket,
    initializeSocket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
