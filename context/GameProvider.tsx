import { Router, useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IGameContext } from "../interfaces/context";

export const GameContext = createContext<IGameContext | null>(null);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [ingame, setIngame] = useState(false);
  const [isDm, setIsDm] = useState(false);
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (roomId) {
      setIngame(true);
      router.push(`/game/${roomId}`);
    }
  }, [roomId]);

  const value = {
    isDm,
    ingame,
    roomId,
    setIngame,
    setIsDm,
    setRoomId,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
