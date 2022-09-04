import type { DocumentReference } from "firebase-admin/firestore";

export interface IUser {
  uid: string;
  username: string;
  characters?: DocumentReference[];
}
