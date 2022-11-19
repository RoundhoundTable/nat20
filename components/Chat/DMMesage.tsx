import { FunctionComponent } from "react";

export interface IDMMessageData {
  message: string;
  media: string;
}

export const DMMessage: FunctionComponent<IDMMessageData> = (props) => {
  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-col border-b-2 border-yellow-200">
        <span className="text-yellow-200 font-bold">Dungeon Master</span>
        <span className="text-white break-words">{props.message}</span>
      </div>
      {props.media && (
        <img
          src={props.media}
          className="ml-12 p-5 w-3/12 drop-shadow-lg rounded-3xl"
        />
      )}
    </div>
  );
};
