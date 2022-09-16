import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-[#44465A] mt-10 mx-28 h-fit max-w-fit min-w-fit border-2 rounded-lg flex">
        <div className="bg-[#252735] p-5 m-5 h-fit text-white rounded-sm flex content-center">
          <div className="p-3 flex-row justify-content-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
