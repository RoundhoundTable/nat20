import { FunctionComponent, ReactNode } from "react";
import { EMessages } from "../../enums/messages";
import { BotMessage } from "./BotMessage";
import { DMMessage } from "./DMMesage";
import { PlayerMessage } from "./PlayerMessage";

interface IChatMessageData {
    role: EMessages
    props?: any
}

const getMessage = (message: EMessages, props?: any) => {
    switch (message){
        case EMessages.DM:
            return <DMMessage {...props} />;
        case EMessages.BOT:
            return <BotMessage {...props} />;
        case EMessages.PLAYER:
            return <PlayerMessage {...props} />;
        default:
            return <></>;
    }
}

export const Message: FunctionComponent<IChatMessageData> = ({role, props}) => {
    return (
        <>
            {getMessage(role, props)}
        </>
    )
}