import { FunctionComponent } from "react";

export interface IBotMessageData {
  message: string;
}

export const BotMessage: FunctionComponent<IBotMessageData> = (props) => {
  return <div>{props.message}</div>;
};
