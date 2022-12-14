import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import useGame from "../hooks/useGame";
import { useSocket } from "../hooks/useSocket";
import { ICharacter } from "../interfaces/entities";
import { CharacterDisplay } from "./CharacterDisplay";
import { Chat } from "./Chat/Chat";

export const PlayerView: NextComponentType = () => {
  const { room } = useGame();
  const { socket } = useSocket();
  const [character, setCharacter] = useState<ICharacter>();

  useEffect(() => {
    if (room && socket) setCharacter(room.players[socket.id]);
  });

  return (
    <div className="flex flex-col w-full h-screen bg-background-500 text-primary-500 font-poppins overflow-hidden">
      <div className="w-full">
        {character && (
          <CharacterDisplay
            {...character}
            _class={character.class}
            CA={character.classArmor}
            currentHitPoints={character.currentHp}
            stats={character.stats as Record<string, number>}
            savingThrows={character.death_throws!}
            gold={25}
            silver={15}
            bronze={5}
          />
        )}
      </div>
      <div className="h-full px-3 pb-3 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
};
