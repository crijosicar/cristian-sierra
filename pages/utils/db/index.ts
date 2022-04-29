import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        process.env.GOOGLE_APPLICATION_CREDENTIALS!
      ),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error);
  }
}

export default admin.firestore();
