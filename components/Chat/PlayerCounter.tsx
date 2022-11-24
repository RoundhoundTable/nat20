import { Icon } from "@iconify/react";
import { EModals } from "../../enums/modals";
import useGame from "../../hooks/useGame";
import useModal from "../../hooks/useModal";

const PlayerCounter = () => {
  const { room } = useGame();
  const { setModal } = useModal();

  return room ? (
    <div
      className="flex flex-row items-center drop-shadow-lg"
      onClick={() => setModal(EModals.PLAYER_LIST)}
    >
      <Icon icon="bxs:user" className="w-8 h-8" />
      <span>{Object.keys(room!.players).length || 0}</span>
    </div>
  ) : (
    <></>
  );
};

export default PlayerCounter;
