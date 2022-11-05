import type { UserCredential } from "firebase/auth";
import { Socket } from "socket.io-client";
import { IUser } from "./entities";
import { EModals } from "../enums/modals";
import { Dispatch, SetStateAction } from "react";

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
  joinRoom: (id: string, password: string) => void;
  createRoom: (password: string) => void;
}

export interface IGameContext {
  roomId: string;
  isDm: boolean;
  setIsDm: Dispatch<SetStateAction<boolean>>;
  setRoomId: Dispatch<SetStateAction<string>>;
  setIngame: Dispatch<SetStateAction<boolean>>;
}

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (modal: EModals) => void;
}
