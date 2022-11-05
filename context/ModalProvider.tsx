import { createContext, PropsWithChildren, useState } from "react";
import { EModals } from "../enums/modals";
import { IModalContext } from "../interfaces/context";
import Modal from "../components/Modals/Modal";

export const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modal, setModalState] = useState<EModals | null>(null);
  const [props, setProps] = useState<any | undefined>(undefined);

  const unsetModal = () => setModalState(null);

  const setModal = (modal: EModals, props?: any) => {
    setModalState(modal);
    setProps(props);
  };

  const value = {
    modal,
    setModal,
    unsetModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {modal && <Modal modal={modal} props={props} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
