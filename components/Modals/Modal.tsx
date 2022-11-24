import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { EModals } from "../../enums/modals";
import useModal from "../../hooks/useModal";
import ConfirmationModal from "./ConfirmationModal";
import CreateGameModal from "./CreateGameModal";
import JoinGameModal from "./JoinGameModal";
import LoginModal from "./LoginModal";
import PlayerListModal from "./PlayerListModal";
import RegisterModal from "./RegisterModal";
import CharacterCreationModal from "./CharacterCreationModal";
import { WikiModal } from "./WikiModal";

interface IModalProps {
  modal: EModals;
  props?: any;
}

const getModal = (modal: EModals, props?: any) => {
  switch (modal) {
    case EModals.LOGIN:
      return <LoginModal />;
    case EModals.REGISTER:
      return <RegisterModal />;
    case EModals.JOIN_GAME:
      return <JoinGameModal />;
    case EModals.CREATE_GAME:
      return <CreateGameModal />;
    case EModals.CONFIRMATION:
      return <ConfirmationModal {...props} />;
    case EModals.WIKI:
      return <WikiModal />;
    case EModals.PLAYER_LIST:
      return <PlayerListModal />;
    case EModals.CHARACTER_CREATION:
      return <CharacterCreationModal />;
    default:
      return <></>;
  }
};

const Modal: FunctionComponent<IModalProps> = ({ modal, props }) => {
  const { unsetModal } = useModal();
  return (
    <div className="absolute bg-[#25273520] backdrop-blur-md w-screen h-screen z-40 overflow-visible">
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#252735] p-8 border-4 border-[#44465A] z-50 max-h-screen w-min ${
          modal === EModals.JOIN_GAME ? "overflow-visible" : "overflow-auto"
        }`}
      >
        <Icon
          onClick={unsetModal}
          className="sticky right-0 top-0 mr-2"
          color="#F6E3B9"
          icon="akar-icons:cross"
        />
        {getModal(modal, props)}
      </div>
    </div>
  );
};

export default Modal;
