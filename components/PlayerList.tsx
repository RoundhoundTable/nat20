import { NextComponentType } from "next";
import { PlayerDisplay } from "./PlayerDisplay";
import useGame from "../hooks/useGame";

export const PlayerList: NextComponentType = () => {
  const { room } = useGame();
  return (
    <div className="overflow-auto w-full md:w-1/2 h-1/3 md:h-full flex flex-row md:flex-col gap-3 items-center">
      {room?.players ? (
        Object.keys(room.players).map((id, key) => {
          const player = room.players[id];
          return (
            <PlayerDisplay
              picture={player.picture}
              hitPoints={player.hitPoints}
              name={player.name}
              _class={player.class}
              level={player.level}
              CA={player.classArmor}
              currentHitPoints={player.currentHp}
              deathThrows={player.death_throws}
              key={key}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
