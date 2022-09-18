import firebase from "../../../utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import Joi from "joi";
import { workClientSchema } from "./index";
import DocumentData = firestore.DocumentData;

const editWorkSchema = Joi.object({
  summary: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  slug: Joi.string(),
  position: Joi.string(),
  companyName: Joi.string(),
  companyIcon: Joi.string(),
  location: Joi.string(),
  contractType: Joi.string().valid("CONTRACTOR", "EMPLOYEE"),
  clients: workClientSchema,
  commitments: Joi.array().items(Joi.string().min(10)),
});

export default async function handler(
  { method, body, query }: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  switch (method) {
    case "PUT":
      try {
        const { value: validPayload, error } = editWorkSchema.validate(body);

        if (error) {
          const [detail] = error.details;
          return res.status(401).json(detail);
        }

        const workId = query.id as string;
        
        await firebase.db.collection("work").doc(workId).update(validPayload);

        res.status(200).json({ workId });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Work could not be updated." });
      }
      break;
    case "DELETE":
      try {
        const workId = query.id as string;

        await firebase.db.collection("work").doc(workId).delete();

        res.status(200).json({ message: "Success" });
      } catch (e) {
        res.status(500).json({ message: "Work could not be deleted." });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
