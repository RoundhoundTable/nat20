import { NextComponentType } from "next";
import { PlayerDisplay } from "./PlayerDisplay";
import useGame from "../hooks/useGame";
import { useSocket } from "../hooks/useSocket";

export const PlayerList: NextComponentType = () => {
  const { socket } = useSocket();
  const { room } = useGame();
  return (
    <div className="overflow-y-hidden md:overflow-auto w-full bg-background-600/50 rounded-xl md:mt-9 md:w-1/2 md:min-w-max flex flex-row md:flex-col gap-3 items-center p-5">
      {room?.players ? (
        Object.keys(room.players).map((id, key) => {
          const player = room.players[id];
          return (
            <PlayerDisplay
              id={id}
              picture={player.picture}
              hitPoints={player.hitPoints}
              name={player.name}
              _class={player.class}
              level={player.level}
              CA={player.classArmor}
              currentHitPoints={player.currentHp}
              deathThrows={player.death_throws}
              key={key}
              isDm={socket?.id === room?.dungeonMaster}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
