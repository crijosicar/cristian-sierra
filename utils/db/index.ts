import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.projectId,
        clientEmail: process.env.clientEmail,
        privateKey: process.env.privateKey,
      }),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error);
  }
}

export default admin.firestore();
