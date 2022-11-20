import { ChangeEventHandler } from "react";
import { Input } from "./Input";

const StatInput = ({
  label,
  name,
  onChange,
  error,
}: {
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
}) => {
  return (
    <div className="flex flex-col text-center">
      <label className="text-primary-500 font-bold text-xl">{label}</label>
      <Input
        className="w-20 sm:w-20 text-center font-bold text-primary-500"
        type="number"
        max={99}
        name={name}
        onChange={onChange}
        error={error}
      />
    </div>
  );
};

export default StatInput;
