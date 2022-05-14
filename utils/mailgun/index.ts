import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: process.env.mailgunUsername!,
  key: process.env.mailgunApiKey!,
});

export default mg;
