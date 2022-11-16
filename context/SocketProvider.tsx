import { createContext, ReactNode, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { ISocketContext } from "../interfaces/context";
import { useAuth } from "../hooks/useAuth";
import useGame from "../hooks/useGame";
import { EVENTS } from "../enums/events";

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { messages, setMessages, room, setRoom } = useGame();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const initializeSocket = async () => {
    await fetch("/api/socket");
    const _socket = io();

    _socket.on(EVENTS.CONNECTED_TO_ROOM, (args) => {
      setRoom(args);
    });

    _socket.on(EVENTS.REFRESH_UI, (args) => {
      setRoom(args);
    });

    _socket.on(EVENTS.MESSAGE, (message) =>
      setMessages((state) => [
        ...state,
        {
          ...message,
        },
      ])
    );

    _socket.on(EVENTS.USER_LEFT, (message) =>
      setMessages((state) => [
        ...state,
        {
          ...message,
        },
      ])
    );

    setSocket(_socket);
  };

  const createRoom = (password: string) => {
    if (currentUser && socket) socket.emit(EVENTS.CREATE_ROOM, { password });
  };

  const joinRoom = (id: string, password: string, characterId: string) => {
    console.log({
      event: EVENTS.JOIN_ROOM,
      data: { id, password, characterId },
    });
    if (currentUser && socket)
      socket.emit(EVENTS.JOIN_ROOM, { id, password, characterId });
  };

  const sendMessage = (message: string) => {
    if (socket) socket.emit(EVENTS.SEND_MESSAGE, message);
  };

  const value = {
    socket,
    initializeSocket,
    joinRoom,
    createRoom,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
