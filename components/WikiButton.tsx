import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const WikiButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="flex flex-row items-center p-2 capitalize hover:bg-black/40 text-primary-500 bg-black/30 gap-1"
    >
      <Icon icon="ant-design:search-outlined" />
      {children}
    </button>
  );
};

export default WikiButton;