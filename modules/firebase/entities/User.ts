import { DocumentReference } from "firebase-admin/firestore";
import { IUser } from "../../../interfaces/firebase";
import { database } from "../../../libs/firebaseAdmin";

class User {
  private static readonly collection = database.collection("users");

  static async create(payload: IUser): Promise<DocumentReference> {
    const { uid, ...data } = payload;
    const docRef = this.collection.doc(uid);

    await docRef.set({
      ...data,
      characters: payload.characters ?? [],
    });

    return docRef;
  }

  static async get(uid: string): Promise<IUser | null> {
    const docRef = this.collection.doc(uid);
    const snapshot = await docRef.get();

    return snapshot.exists
      ? {
          ...(snapshot.data() as IUser),
          uid,
        }
      : null;
  }
}

export default User;
