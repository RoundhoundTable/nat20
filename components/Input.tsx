import { NextComponentType } from "next";
import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";
interface IInputProps {
  label?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  errorClassName?: string;
  onChange?: (...args: any) => any;
  error?: {
    message?: string;
  };
  value?: string;
}

export const Input = ({
  label,
  name,
  type,
  className,
  errorClassName = "border-b-2 border-danger-500",
  onChange,
  error,
  value,
}: IInputProps) => {
  return (
    <label className="flex flex-col text-medium text-left text-primary-500 mt-2 w-full">
      {label}
      <input
        className={twMerge(
          "bg-black/30 text-white border-b-2 border-primary-500 px-2 sm:w-80 sm:h-9 w-60 rounded-lg focus:outline-none",
          className,
          error?.message ? errorClassName : ""
        )}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error?.message && (
        <div className="text-xs font-light text-danger-500">
          {error.message}
        </div>
      )}
    </label>
  );
};
