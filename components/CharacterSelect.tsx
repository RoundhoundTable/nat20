import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useUserCharacterList } from "../hooks/useUserCharacterList";
import { ICharacter } from "../interfaces/entities";
import { Character } from "./Character";

type CharacterSelectProps = {};
type CharacterSelectHandle = {
  selected: ICharacter | null;
};

const CharacterSelect: React.ForwardRefRenderFunction<
  CharacterSelectHandle,
  CharacterSelectProps
> = (_, ref) => {
  const { characters } = useUserCharacterList();
  const [showList, setShowList] = useState<boolean>(false);
  const [selected, setSelected] = useState<ICharacter | null>(null);

  const toggleList = () => setShowList(!showList);

  useImperativeHandle(ref, () => ({
    selected,
  }));

  useEffect(() => {
    if (characters) setSelected(characters[0]);
  }, [characters]);

  if (!characters || characters.length === 0)
    return (
      <div className="bg-black/30 text-primary-500 p-6 w-full rounded-xl border-b-2 border-b-primary-500">
        You must have at least one character
      </div>
    );

  return (
    <div className="relative w-full">
      <Icon
        className="absolute text-primary-500 w-8 h-8 right-2 top-1/2 -translate-y-1/2 cursor-pointer z-20"
        icon="material-symbols:keyboard-arrow-down-rounded"
        onClick={toggleList}
      />
      {selected && (
        <Character
          {...selected}
          _class={selected.class}
          wrapperClassname={`bg-black/30 rounded-xl border-b-2 border-b-primary-500 ${
            !showList ? "rounded-xl" : "rounded-b-none"
          }`}
          hideDelete
        />
      )}
      {showList && (
        <div className="absolute z-20 w-full -translate-y-2 h-36 overflow-auto">
          {characters &&
            characters.map((character: ICharacter, key: number) => {
              const props = {
                ...character,
                _class: character.class,
                hideDelete: true,
                key: key,
              };

              let className = "bg-background-500 ";

              if (character.id === selected?.id)
                className +=
                  "border-x-2 border-x-primary-500 shadow-[0px_10px_15px_#F6E3B9AA] ";

              switch (key) {
                case 0:
                  className += "rounded-none";
                  break;
                case characters.length - 1:
                  className += "rounded-b-xl border-b-2 border-b-primary-500";
              }

              return (
                <Character
                  {...props}
                  key={key}
                  wrapperClassname={className}
                  onClick={() => {
                    setSelected(character);
                    toggleList();
                  }}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default forwardRef(CharacterSelect);
