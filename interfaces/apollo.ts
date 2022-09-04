import { IUser } from "./firebase";

export interface ApolloContext {
  user: IUser | null;
}
