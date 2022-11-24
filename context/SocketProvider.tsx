import { createContext, ReactNode, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { ISocketContext } from "../interfaces/context";
import { useAuth } from "../hooks/useAuth";
import useGame from "../hooks/useGame";
import { EVENTS } from "../enums/events";
import Router from "next/router";
import { IMessage } from "../interfaces/game";
import { ICharacter } from "../interfaces/entities";

export const SocketContext = createContext<ISocketContext | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { setMessages, setRoom } = useGame();
  const { currentUser } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const initializeSocket = async () => {
    await fetch("/api/socket");
    const _socket = io();

    _socket.on(EVENTS.REFRESH_ROOM, (args) => {
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

    _socket.on(EVENTS.DM_LEFT, (message) => {
      setMessages((state) => [
        ...state,
        {
          ...message,
        },
      ]);

      setTimeout(() => {
        setRoom(null);
        setMessages([]);
        Router.push("/");
      }, 4000);
    });

    setSocket(_socket);
  };

  const createRoom = (password: string) => {
    if (currentUser && socket) socket.emit(EVENTS.CREATE_ROOM, { password });
  };

  const joinRoom = (id: string, password: string, characterId: string) => {
    if (currentUser && socket)
      socket.emit(EVENTS.JOIN_ROOM, { id, password, characterId });
  };

  const sendMessage = (obj: Pick<IMessage, "message" | "media">) => {
    if (!socket || (!obj.message && !obj.media)) return;

    socket.emit(EVENTS.SEND_MESSAGE, obj);
    if (obj.message.startsWith("/roll") || obj.message.startsWith("/r"))
      socket.emit(EVENTS.THROW_DICE, obj.message.split(" ")[1]);
  };

  const updateCharacter = (id: string, payload: Partial<ICharacter>) => {
    if (!socket) return;

    socket.emit(EVENTS.UPDATE_CHARACTER, { id, payload });
  };

  const value = {
    socket,
    initializeSocket,
    joinRoom,
    createRoom,
    sendMessage,
    updateCharacter,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
