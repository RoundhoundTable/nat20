import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../modules/firebase/service-account.json";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  } catch (err) {
    console.log(err);
  }
}

export const auth = getAuth();
export const database = getFirestore();
