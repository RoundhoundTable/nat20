import type { UserCredential } from "firebase/auth";
import { Socket } from "socket.io-client";
import { IUser } from "./firebase";

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
}
