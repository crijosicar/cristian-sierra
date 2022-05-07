import { isEmpty } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import mg from "../../utils/mailgun";

const isPayloadValid = (body: Record<string, any>): boolean => {
  if (isEmpty(body)) {
    return false;
  }

  return !isEmpty(body.email) || !isEmpty(body.message);
};

export default async function handler(
  { method, body }: NextApiRequest,
  res: NextApiResponse
) {
  switch (method) {
    case "POST":
      if (!isPayloadValid(body)) {
        return res.status(400).json({});
      }

      const mailgunDomain = process.env.mailgunDomain;
      const personalEmail = process.env.personalEmail;
      const mailgunEmail = process.env.mailgunEmail;

      const data = {
        from: mailgunEmail,
        to: personalEmail,
        subject: "Portfolio Site Contact Form",
        template: "portfoliositecontactform",
        "h:X-Mailgun-Variables": JSON.stringify({ test: "test" }),
      };
      
      mg.messages
        .create(mailgunDomain!, data)
        .then((msg) => console.log("msg", msg))
        .catch((err) => console.log("error", err));

      res.status(200).json({});
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
