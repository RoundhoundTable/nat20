import { NextComponentType } from "next";

export const Input: NextComponentType = () => {
  return (
    <>
      <div>
        <input
          type="text"
          className="bg-black/30 text-white border-b-2 border-[#F6E3B9] px-2 rounded-md focus:outline-none"
        />
      </div>
    </>
  );
};
