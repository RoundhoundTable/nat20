import { FunctionComponent } from "react";

interface ICharacterStatData {
  name: string;
  value: number;
}

const getModifier = (stat: number) => Math.floor((stat - 10) / 2);

export const CharacterStat: FunctionComponent<ICharacterStatData> = (props) => {
  const modifier = getModifier(props.value);
  return (
    <div className="flex flex-col items-center px-1 md:p-2">
      <span className="uppercase font-bold text-md drop-shadow-[0px_0px_2px_#F6E3B9]">
        {props.name}
      </span>
      <div className="flex flex-row text-xs gap-1">
        <span>{props.value}</span>
        <span className="font-thin">({modifier})</span>
      </div>
    </div>
  );
};
