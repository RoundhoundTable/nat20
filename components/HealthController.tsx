import { FunctionComponent, useEffect, useRef, useState } from "react";
import useGame from "../hooks/useGame";
import { useSocket } from "../hooks/useSocket";

interface HealthControllerProps {
  current: number;
  max: number;
  id: string;
  isDm?: boolean;
}

const HealthController: FunctionComponent<HealthControllerProps> = ({
  current,
  id,
  max,
  isDm,
}) => {
  const intervalRef = useRef<NodeJS.Timer | null>();
  const [currentHP, setCurrentHP] = useState(current);
  const { room } = useGame();
  const { updateCharacter } = useSocket();

  const startChangingValue = (func: Function, args: any) => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      func(args);
    }, 100);
  };

  const stopChangingValue = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    updateCharacter(id, { currentHp: currentHP });
  };

  const changeHp = (value: number) => {
    setCurrentHP((state) => state + value);

    if (room) room.players[id].currentHp = current;
  };

  useEffect(() => {
    return () => stopChangingValue();
  }, []);

  return (
    <div className="flex flex-row gap-5">
      {isDm && (
        <button
          onMouseDown={() => startChangingValue(changeHp, 1)}
          onMouseUp={stopChangingValue}
          onMouseLeave={stopChangingValue}
        >
          +
        </button>
      )}
      <span className="select-none">
        {currentHP}/{max}
      </span>
      {isDm && (
        <button
          onMouseDown={() => startChangingValue(changeHp, -1)}
          onMouseUp={stopChangingValue}
          onMouseLeave={stopChangingValue}
        >
          -
        </button>
      )}
    </div>
  );
};

export default HealthController;
