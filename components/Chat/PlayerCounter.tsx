import { Icon } from "@iconify/react";
import useGame from "../../hooks/useGame";

const PlayerCounter = () => {
  const { room } = useGame();
  return (
    <div className="flex flex-row items-center">
      <Icon icon="bxs:user" />
      {Object.keys(room!.players).length || 0}
    </div>
  );
};

export default PlayerCounter;
