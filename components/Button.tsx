import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-primary-500 sm:w-80 sm:h-9 w-60 rounded-lg uppercase border border-primary-500 hover:bg-background-500 text-background-500 hover:text-primary-500 disabled:hover:text-background-500 text-xl disabled:bg-background-400 disabled:border-background-600",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
