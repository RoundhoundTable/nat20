import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  errorClassName?: string;
  error?: {
    message?: string;
  };
}

export const Input = forwardRef(
  (_props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      errorClassName = "border-b-2 border-danger-500",
      error,
      className,
      ...props
    } = _props;

    return (
      <label className="flex flex-col text-medium text-left text-primary-500 mt-2 w-full">
        {label}
        <input
          className={twMerge(
            "bg-black/30 text-white border-b-2 border-primary-500 px-2 sm:w-80 sm:h-9 w-60 rounded-lg focus:outline-none",
            className,
            error?.message ? errorClassName : ""
          )}
          {...props}
          ref={ref}
        />
        {error?.message && (
          <div className="text-xs font-light text-danger-500">
            {error.message}
          </div>
        )}
      </label>
    );
  }
);
