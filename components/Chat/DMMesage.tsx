import { FunctionComponent } from "react";

export interface IDMMessageData {
  message: string;
}

export const DMMessage: FunctionComponent<IDMMessageData> = (props) => {
  return (
    <div className="flex flex-col w-fit border-b-2 border-yellow-200">
      <span className="text-yellow-200 font-bold">Dungeon Master</span>
      <span className="text-white">{props.message}</span>
    </div>
  );
};
