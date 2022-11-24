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
  error?: string | boolean;
}

export const Input = forwardRef(
  (_props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      label,
      errorClassName = "border-b-2 border-danger-800",
      error,
      className,
      ...props
    } = _props;

    return (
      <div className="w-full">
        <p className="text-medium text-left text-primary-500 mt-2 font-poppins">
          {label}
        </p>
        <input
          className={twMerge(
            "bg-black/30 border-b-2 border-primary-500 text-primary-500 px-2 w-full h-9 rounded-lg focus:outline-none",
            className,
            error ? errorClassName : ""
          )}
          {...props}
          ref={ref}
        />
        {error && typeof error === "string" && (
          <div className="text-xs font-light text-danger-800">{error}</div>
        )}
      </div>
    );
  }
);
