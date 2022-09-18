import { NextApiRequest, NextApiResponse } from "next";
import mg from "../../utils/mailgun";
import Joi from "joi";

type ContactFormResponse = {
  message: string;
};

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  message: Joi.string().required(),
});

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<ContactFormResponse>
) {
  switch (method) {
    case "POST":
      await schema.validateAsync(body);

      const mailgunDomain = process.env.mailgunDomain;
      const personalEmail = process.env.personalEmail;
      const mailgunEmail = process.env.mailgunEmail;

      const data = {
        from: mailgunEmail,
        to: personalEmail,
        subject: "Portfolio Site Contact Form",
        template: "portfoliositecontactform",
        "h:X-Mailgun-Variables": JSON.stringify(body),
      };

      mg.messages
        .create(mailgunDomain!, data)
        .then((msg: any) => console.log("msg", msg))
        .catch((err: any) => console.log("error", err));

      res.status(200).json({ message: "Success" });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
