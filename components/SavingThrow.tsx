import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

interface ISavingThrowData {
  throws: (boolean | null)[];
}

export const SavingThrow: FunctionComponent<ISavingThrowData> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm">Death Saves</span>
      <div className="flex flex-row justify-center">
        {props.throws.map((value, key) => {
          return value === null ? (
            <Icon icon="bi:dot" key={key} />
          ) : (
            <Icon
              icon={value ? "fa6-solid:cross" : "mdi:grave-stone"}
              className={value ? "drop-shadow-[0px_0px_2px_#F6E3B9]" : ""}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};
