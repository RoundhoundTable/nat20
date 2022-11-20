import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import { EModals } from "../enums/modals";
import { useDeleteCharacter } from "../hooks/useDeleteCharacter";
import useModal from "../hooks/useModal";

interface ICharacterData {
  id: string;
  picture: string;
  name: string;
  _class: string;
  level: number;
  hideDelete?: boolean;
  wrapperClassname?: string;
  onClick?: (...args: any) => void;
}

export const Character: FunctionComponent<ICharacterData> = ({
  id,
  picture,
  name,
  _class,
  level,
  hideDelete,
  wrapperClassname,
  onClick,
}) => {
  const { setModal } = useModal();
  const { deleteCharacter } = useDeleteCharacter(id);
  return (
    <div
      className={twMerge(
        "flex flex-row gap-4 items-center p-2 bg-background-600/50 snap-start text-primary-500 relative",
        wrapperClassname
      )}
      onClick={onClick}
    >
      {!hideDelete && (
        <button
          onClick={() =>
            setModal(EModals.CONFIRMATION, {
              message: `¿Está seguro que desea eliminar a ${name}?`,
              accept: deleteCharacter,
            })
          }
        >
          <Icon icon="akar-icons:cross" className="absolute top-4 right-2" />
        </button>
      )}
      <img
        src={picture}
        className="w-14 rounded-full object-cover aspect-square"
      />
      <div className="flex flex-col w-1/2">
        <span className="font-bold">{name}</span>
        <div className="flex flex-row text-sm justify-between">
          <span>{_class}</span>
          <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">lv.{level}</span>
        </div>
      </div>
    </div>
  );
};
