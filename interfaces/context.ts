import type { UserCredential } from "firebase/auth";
import { Socket } from "socket.io-client";
import { IUser } from "./entities";
import { EModals } from "../enums/modals";

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
  createRoom: (campaignId: string) => void;
}

export interface IModalContext {
  modal: EModals | null;
  unsetModal: () => void;
  setModal: (modal: EModals) => void;
}
