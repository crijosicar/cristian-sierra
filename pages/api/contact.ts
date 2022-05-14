import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import mg from "../../utils/mailgun";

type ContactFormResponse = {
  message: string;
};

const isPayloadValid = (body: Record<string, any>): boolean => {
  return !isEmpty(body) && !isEmpty(body.email) && !isEmpty(body.message);
};

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<ContactFormResponse>
) {
  switch (method) {
    case "POST":
      if (!isPayloadValid(body)) {
        return res.status(400).json({ message: "Invalid request" });
      }

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
        .then((msg) => console.log("msg", msg))
        .catch((err) => console.log("error", err));
      
      res.status(200).json({ message: "Success" });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
