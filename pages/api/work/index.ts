import db from "../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const work = await db.collection("work").get();
    const workData = work.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    res.status(200).json({ workData });
  } catch (e) {
    res.status(400).end();
  }
}
