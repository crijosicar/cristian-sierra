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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  db: admin.firestore(),
  storage: admin.storage(),
  remoteConfig: admin.remoteConfig(),
};
