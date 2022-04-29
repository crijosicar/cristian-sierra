import * as admin from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(serviceAccountKey),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error);
  }
}

export default admin.firestore();
