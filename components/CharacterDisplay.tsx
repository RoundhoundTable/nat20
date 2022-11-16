import Image from "next/image";
import { FunctionComponent } from "react";
import { CharacterStat } from "./CharacterStat";
import CAIcon from "../assets/images/CAIcon.svg";
import { HealthBar } from "./HealthBar";
import { SavingThrow } from "./SavingThrow";
import { Purse } from "./Purse";

interface ICharacterDisplayData {
  picture: string;
  name: string;
  _class: string;
  level: number;
  initiative: number;
  CA: number;
  hitPoints: number;
  currentHitPoints: number;
  stats: Record<string, number>;
  savingThrows: (boolean | null)[];
  gold: number;
  silver: number;
  bronze: number;
}

export const CharacterDisplay: FunctionComponent<ICharacterDisplayData> = (
  props
) => {
  return (
    <div className="grid items-center justify-center w-full p-2 bg-black/20">
      <div className="w-fit flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-center">
        <div className="flex flex-row gap-2 md:gap-5 justify-center items-center">
          <img
            src={props.picture}
            className="rounded-full w-28 h-28 object-cover"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-10">
              <div>
                <span className="font-bold md:text-xl">{props.name}</span>
                <div className="flex flex-row text-xs md:text-sm justify-between">
                  <span>{props._class}</span>
                  <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">
                    lv.{props.level}
                  </span>
                </div>
              </div>

              <div className="flex flex-col text-xs md:text-sm text-center">
                <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">
                  Initiative
                </span>
                <span>{props.initiative}</span>
              </div>

              <div className="relative min-w-max h-fit">
                <Image src={CAIcon} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4">
                  {props.CA}
                </span>
              </div>
            </div>

            <HealthBar
              hitPoints={props.hitPoints}
              currentHitPoints={props.currentHitPoints}
            />

            <div className="flex flex-row">
              <CharacterStat name="str" value={props.stats["STR"]} />
              <CharacterStat name="dex" value={props.stats["DEX"]} />
              <CharacterStat name="con" value={props.stats["CON"]} />
              <CharacterStat name="int" value={props.stats["INT"]} />
              <CharacterStat name="wis" value={props.stats["WIS"]} />
              <CharacterStat name="cha" value={props.stats["CHA"]} />
            </div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-5">
          <SavingThrow throws={props.savingThrows} />
          <Purse gold={25} silver={15} bronze={5} />
        </div>
      </div>
    </div>
  );
};

{
}
