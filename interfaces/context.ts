import type { UserCredential } from "firebase/auth";
import { IUser } from "./firebase";

export interface IAuthContext {
  currentUser: IUser | null;
  signIn: (token: string) => Promise<UserCredential>;
  signOut: () => void;
  signUp: (token: string) => Promise<UserCredential>;
  fetch: () => Promise<void>;
}
