import firebase from "../../../utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const about = await firebase.db.collection("about").get();
    const [aboutData] = about.docs.map((item) => (item.data()));
    const resumeUrl = firebase.storage.bucket('default').file(aboutData.resumeUrl).publicUrl();


    res.status(200).json({ resumeUrl, ...aboutData });
  } catch (e) {
    res.status(400).end();
  }
}
