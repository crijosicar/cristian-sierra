import db from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const about = await db.collection("about").get();
    const [aboutData] = about.docs.map((item) => (item.data()));
    const social = aboutData ? aboutData.social : {};

    res.status(200).json(social);
  } catch (e) {
    res.status(400).end();
  }
}
