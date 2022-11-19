import { FunctionComponent } from "react";

export interface IBotMessageData {
  message: string;
}

export const BotMessage: FunctionComponent<IBotMessageData> = (props) => {
  return <p className="whitespace-pre-wrap break-words">{props.message}</p>;
};
