import type { UserCredential } from "firebase/auth";
import { Socket } from "socket.io-client";
import { ICharacter, IUser } from "./entities";
import { EModals } from "../enums/modals";
import { Dispatch, SetStateAction } from "react";
import { IMessage, IRoomState } from "./game";

export interface IAuthContext {
  currentUser: IUser | null;
  signIn: (token: string) => Promise<UserCredential>;
  signOut: () => void;
  signUp: (token: string) => Promise<UserCredential>;
  fetch: () => Promise<void>;
}

export interface ISocketContext {
  socket: Socket | null;
  initializeSocket: () => Promise<void>;
  joinRoom: (id: string, password: string, characterId: string) => void;
  createRoom: (password: string) => void;
  sendMessage: (message: Pick<IMessage, "message" | "media">) => void;
  updateCharacter: (id: string, payload: Partial<ICharacter>) => void;
}

export interface IGameContext {
  room: IRoomState | null;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  setRoom: Dispatch<SetStateAction<IRoomState | null>>;
}

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (modal: EModals, props?: any) => void;
}
