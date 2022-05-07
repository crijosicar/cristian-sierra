import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.mailgunApiKey!,
});

export default mg;
