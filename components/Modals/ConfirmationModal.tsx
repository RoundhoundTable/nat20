import Button from "../Button";
import { FunctionComponent } from "react";
import useModal from "../../hooks/useModal";

interface ConfirmationModalProps {
  message: string;
  accept: (...args: any) => any;
}

const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = ({
  message,
  accept,
}) => {
  const { unsetModal } = useModal();
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-lg font-bold text-primary-500">{message}</p>
      <div className="flex flex-row gap-5">
        <Button className="sm:w-40" onClick={accept}>
          Aceptar
        </Button>
        <Button
          onClick={unsetModal}
          className="bg-transparent border-red-800 hover:bg-red-900 text-red-800 sm:w-40"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
