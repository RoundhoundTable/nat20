import { Icon } from "@iconify/react";
import { FunctionComponent, ReactNode } from "react";
import { EModals } from "../../enums/modals";
import useModal from "../../hooks/useModal";
import CreateGameModal from "./CreateGameModal";
import JoinGameModal from "./JoinGameModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

interface IModalProps {
  modal: EModals;
}

const modals: Record<EModals, ReactNode> = {
  JOIN_GAME: <JoinGameModal />,
  REGISTER: <RegisterModal />,
  LOGIN: <LoginModal />,
  CREATE_GAME: <CreateGameModal />,
};

const Modal: FunctionComponent<IModalProps> = ({ modal }) => {
  const { unsetModal } = useModal();
  return (
    <div className="absolute bg-[#25273520] backdrop-blur-md w-screen h-screen z-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#252735] p-8 border-4 border-[#44465A] z-50">
        <Icon
          onClick={unsetModal}
          className="absolute right-0 top-0 mr-2 mt-2"
          color="#F6E3B9"
          icon="akar-icons:cross"
        />
        {modals[modal]}
      </div>
    </div>
  );
};
/*
    <div className="absolute top-0 left-0 ml-1/2">
      <div className=" mx-28 h-fit max-w-fit min-w-fit border-2 rounded-lg flex">
        <div className=" p-5 m-5 h-fit text-white rounded-sm flex content-center">
          <div className="p-3 flex-row justify-content-center">
            
          </div>
        </div>
      </div>
      
    </div>*/
export default Modal;
