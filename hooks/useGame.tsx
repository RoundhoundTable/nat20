import { useContext } from "react";
import { GameContext } from "../context/GameProvider";

const useGame = () => {
  const context = useContext(GameContext);

  if (!context) throw new Error("useGame can only be used inside GameProvider");

  return context;
};

export default useGame;
