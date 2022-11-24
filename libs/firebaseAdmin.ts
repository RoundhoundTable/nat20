import admin, { ServiceAccount } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(
          Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 as string,
            "base64"
          ).toString("ascii")
        ) as admin.ServiceAccount
      ),
    });
  } catch (err) {
    console.log(err);
  }
}

export const auth = getAuth();