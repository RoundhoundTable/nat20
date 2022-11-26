import useGame from "../../hooks/useGame";
import useModal from "../../hooks/useModal";
import { PlayerDisplay } from "../PlayerDisplay";

const PlayerListModal = () => {
  const { room } = useGame();
  const { unsetModal } = useModal();

  if (!room) unsetModal();

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-center font-bold text-primary-500 text-2xl pb-2 border-b-2 border-b-primary-500">
        Jugadores Conectados
      </h1>
      {room?.players ? (
        Object.keys(room?.players).map((id, key) => {
          const player = room?.players[id];
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
              key={key}
              deathThrows={player.death_throws}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PlayerListModal;
