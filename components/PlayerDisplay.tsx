import CaIcon from "../assets/images/CAIcon.svg";
import {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { SavingThrow } from "./SavingThrow";
import useGame from "../hooks/useGame";
import { useSocket } from "../hooks/useSocket";
import HealthController from "./HealthController";

interface ICharacterData {
  id: string;
  picture: string;
  name: string;
  _class: string;
  level: number;
  CA: number;
  hitPoints: number;
  currentHitPoints: number;
  deathThrows: (boolean | null)[];
  isDm?: boolean;
}

export const PlayerDisplay: FunctionComponent<ICharacterData> = ({
  id,
  picture,
  name,
  _class,
  level,
  CA,
  hitPoints,
  currentHitPoints,
  deathThrows,
  isDm,
}) => {
  const healthPercent = (100 / hitPoints) * currentHitPoints;

  const getHealthColor = () => {
    if (healthPercent < 75 && healthPercent >= 50) return "#fde048";
    if (healthPercent <= 25) return "#dc2626";
    return "#65a30d";
  };

  return (
    <div className="flex flex-row w-full gap-4 items-center p-2 snap-start text-primary-500 relative">
      <div className="flex flex-col items-center">
        <img
          src={picture}
          className="w-14 rounded-full object-cover aspect-square"
          style={{
            boxShadow: `0px 0px 10px ${
              (10 / hitPoints) * currentHitPoints * 0.5
            }px ${getHealthColor()}`,
          }}
        />
        <HealthController
          current={currentHitPoints}
          max={hitPoints}
          id={id}
          isDm={isDm}
        />
      </div>
      <div className="flex flex-col w-1/2">
        <span className="font-bold">{name}</span>
        <div className="flex flex-row text-sm justify-between">
          <span>{_class}</span>
          <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">lv.{level}</span>
        </div>
      </div>
      <div className="relative">
        <img src={CaIcon.src} />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4">
          {CA}
        </span>
      </div>
    </div>
  );
};
