import { NextComponentType } from "next";
import { useState } from "react";
import { Character } from "./Character";
import { twMerge } from "tailwind-merge";
import { useUserCharacterList } from "../hooks/useUserCharacterList";
import useModal from "../hooks/useModal";
import { EModals } from "../enums/modals";

export const CharactersList: NextComponentType = () => {
  const { characters, isLoading } = useUserCharacterList();
  const { setModal } = useModal();
  const [viewList, setViewList] = useState<boolean>(false);

  return (
    <div
      className={twMerge(
        "md:absolute top-0 right-0 w-full md:w-64 lg:w-96 bg-[#21222A]",
        viewList && "absolute h-screen md:h-auto overflow-hidden z-10"
      )}
    >
      <button
        className="bg-[#21222A] text-white font-bold w-full h-16 text-center uppercase"
        onClick={() => setViewList(!viewList)}
      >
        Characters
      </button>
      {viewList && (
        <>
          <div className="h-full md:max-h-72 overflow-auto snap-y">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              characters.map((character: any, key: number) => (
                <Character
                  id={character.id}
                  key={key}
                  picture={character.picture}
                  name={character.name}
                  _class={character.class}
                  level={character.level}
                />
              ))
            )}
          </div>
          <button
            className="sticky bottom-0 bg-[#21222A] text-white font-bold w-full h-16 text-center"
            onClick={() => setModal(EModals.CHARACTER_CREATION)}
          >
            New character
          </button>
        </>
      )}
    </div>
  );
};
