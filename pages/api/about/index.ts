import firebase from "../../../utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import DocumentData = firestore.DocumentData;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  try {
    const about = await firebase.db.collection("about").get();
    const [aboutData] = about.docs.map((item) => item.data());

    res.status(200).json(aboutData);
  } catch (e) {
    res.status(400).end();
  }
}
