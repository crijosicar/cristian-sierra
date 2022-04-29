import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      await db
        .collection("work")
        .doc(id as string)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        });
    } else if (req.method === "GET") {
      const doc = await db
        .collection("work")
        .doc(id as string)
        .get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === "DELETE") {
      await db
        .collection("work")
        .doc(id as string)
        .delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}
