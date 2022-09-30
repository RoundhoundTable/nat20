import { NextComponentType } from "next";

export const Input: NextComponentType = () => {
  return (
        <input
          type="text"
          className="bg-black/30 text-white border-b-2 border-primary-500 px-2 sm:w-80 sm:h-9 w-60 rounded-lg focus:outline-none"
        />
  );
};

export default Input;
