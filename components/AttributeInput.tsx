import { Icon } from "@iconify/react";
import { ChangeEventHandler } from "react";

const AttributeInput = ({
  placeholder,
  icon,
  name,
  onChange,
  error,
}: {
  placeholder: string;
  icon: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
}) => {
  return (
    <div className="relative flex flex-row align-middle items-center">
      <Icon
        icon={icon}
        className={`text-black/20 ${
          error ? "stroke-danger-800" : "stroke-primary-500"
        } stroke-1 w-20 h-auto`}
      />
      <input
        placeholder={placeholder}
        type="number"
        name={name}
        className="absolute text-center text-primary-500 font-bold bg-transparent focus:outline-none placeholder:text-primary-500 placeholder:font-bold w-full"
        max={99999}
        onChange={onChange}
      />
    </div>
  );
};

export default AttributeInput;
