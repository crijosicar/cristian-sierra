import firebase from "../../../utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { isEmpty } from "lodash";
import DocumentData = firestore.DocumentData;

export const workClientSchema = Joi.array().items(
  Joi.object({
    clientName: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date(),
    projects: Joi.array()
      .items(
        Joi.object({
          projectName: Joi.string().required(),
          commitments: Joi.array().items(Joi.string().required()).min(1),
          technologies: Joi.array().items(Joi.string().required()).min(1),
          startDate: Joi.date().required(),
          endDate: Joi.date(),
        }).required()
      )
      .required(),
  })
);

const createWorkSchema = Joi.object({
  summary: Joi.string().default(""),
  startDate: Joi.date().required(),
  endDate: Joi.date(),
  slug: Joi.string(),
  position: Joi.string().required(),
  companyName: Joi.string().required(),
  companyIcon: Joi.string().default(""),
  location: Joi.string().required(),
  contractType: Joi.string()
    .valid("CONTRACTOR", "EMPLOYEE")
    .default("EMPLOYEE"),
  clients: workClientSchema,
  commitments: Joi.array().items(Joi.string().min(10)),
});

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<DocumentData>
) {
  switch (method) {
    case "GET":
      try {
        const worksRaw = await firebase.db
          .collection("work")
          .orderBy("startDate", "desc")
          .get();

        const works = worksRaw.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        res.status(200).json({ works });
      } catch (e) {
        res.status(500).json({ message: "Works could not be returned." });
      }
      break;
    case "POST":
      try {
        const { value: validPayload, error } = createWorkSchema.validate(body);

        if (error) {
          const [detail] = error.details;
          return res.status(401).json(detail);
        }
        //firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815"))
        const workId = uuidv4();
        const computedSlug =
          validPayload.slug ||
          validPayload.companyName.replace(/\s/g, "-").toLowerCase();

        const currentUser = await firebase.db
          .collection("work")
          .where("slug", "==", computedSlug)
          .get();

        if (!isEmpty(currentUser.docs)) {
          return res.status(401).json({ message: "Work already exists." });
        }

        await firebase.db
          .collection("work")
          .doc(workId)
          .set(validPayload, { merge: true });

        res.status(200).json({ workId });
      } catch (e) {
        res.status(500).json({ message: "Work could not be created." });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
