import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import useModal from "../hooks/useModal";
import { EModals } from "../enums/modals";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const WikiButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  const { setModal } = useModal();

  return (
    <button
      {...props}
      className="flex flex-row items-center p-2 font-bold border-[1px] drop-shadow-lg bg-primary-500 text-background-500 gap-1 border-primary-500 hover:bg-background-500 hover:text-primary-500 rounded-full"
      onClick={() => setModal(EModals.WIKI)}
    >
      <Icon icon="ant-design:search-outlined" className="w-6 h-6" />
      {children}
    </button>
  );
};

export default WikiButton;
