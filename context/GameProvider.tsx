import { Router, useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IGameContext } from "../interfaces/context";
import { IMessage, IRoomState } from "../interfaces/game";

export const GameContext = createContext<IGameContext | null>(null);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [room, setRoom] = useState<IRoomState | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (room) {
      router.push(`/game/${room.id}`);
    }
  }, [room]);

  const value = {
    room,
    messages,
    setMessages,
    setRoom,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
