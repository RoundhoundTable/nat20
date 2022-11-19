import { EMessages } from "../enums/messages";
import { ICharacter } from "./entities";

export interface IMessage {
  role: EMessages;
  name?: string;
  thumbnail?: string;
  media?: string;
  message: string;
}

export interface IRoomState {
  id: string;
  dungeonMaster: string;
  messages: EMessages[];
  players: Record<string, ICharacter>;
}
