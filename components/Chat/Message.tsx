import { FunctionComponent, ReactNode } from "react";
import { EMessages } from "../../enums/messages";
import { BotMessage, IBotMessageData } from "./BotMessage";
import { DMMessage, IDMMessageData } from "./DMMesage";
import { IPlayerMessageData, PlayerMessage } from "./PlayerMessage";

type IMessageProps = IPlayerMessageData | IDMMessageData | IBotMessageData;

interface IChatMessageData {
  role: EMessages;
  props?: IMessageProps;
}

const getMessage = (message: EMessages, props?: IMessageProps) => {
  switch (message) {
    case EMessages.DM:
      return <DMMessage {...(props as IDMMessageData)} />;
    case EMessages.BOT:
      return <BotMessage {...(props as IBotMessageData)} />;
    case EMessages.PLAYER:
      return <PlayerMessage {...(props as IPlayerMessageData)} />;
    default:
      return <></>;
  }
};

export const Message: FunctionComponent<IChatMessageData> = ({ role, props }) =>
  getMessage(role, props);
