import { Icon } from "@iconify/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

interface ISavingThrowData {
  id: string;
  throws: (boolean | null)[];
  isDm?: boolean;
}

export const SavingThrow: FunctionComponent<ISavingThrowData> = (props) => {
  const { updateCharacter } = useSocket();
  const [savingThrows, setSavingThrows] = useState<(boolean | null)[]>(
    props.throws
  );

  const switchThrows = (index: number) => {
    if (!props.isDm) return;
    const throws = savingThrows.map((sThrow, idx) => {
      if (idx !== index) return sThrow;

      switch (sThrow) {
        case true:
          return false;
        case false:
          return null;
        default:
          return true;
      }
    });

    setSavingThrows(throws);
  };

  useEffect(() => {
    updateCharacter(props.id, { death_throws: savingThrows });
  }, [JSON.stringify(savingThrows)]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm">Death Saves</span>
      <div className="flex flex-row justify-center">
        {savingThrows.map((value, key) => {
          return value === null ? (
            <Icon icon="bi:dot" key={key} onClick={() => switchThrows(key)} />
          ) : (
            <Icon
              icon={value ? "fa6-solid:cross" : "mdi:grave-stone"}
              className={value ? "drop-shadow-[0px_0px_2px_#F6E3B9]" : ""}
              onClick={() => switchThrows(key)}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};
