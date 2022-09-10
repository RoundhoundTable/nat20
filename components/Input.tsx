import { NextComponentType } from "next";

export const Input: NextComponentType = () => {
  return (
    <>
      <div>
        <input
          type="text"
          className="bg-black/30 text-white border-b-2 border-[#F6E3B9] px-2 sm:w-80 sm:h-9 w-60 rounded-lg focus:outline-none"
        />
      </div>
    </>
  );
};

export default Input;
