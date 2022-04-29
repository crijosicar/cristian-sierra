import db from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const about = await db.collection("about").get();
    const aboutData = about.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    res.status(200).json({ aboutData });
  } catch (e) {
    res.status(400).end();
  }
}
