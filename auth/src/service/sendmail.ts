import nodemailer from "nodemailer";
import { Response } from "express";
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@mapourmind.com",
    pass: process.env.MAIL_PASS,
  },
});

export function sendEmail(email: any, body: any, res: Response) {
  const options = {
    from: "noreply@mapourmind.com",
    to: email,
    subject: "Reset Password",
    text: body,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      //   res
      //     .sendStatus(503)
      //     .send({ message: "unable to send mail, please retry" });
    } else {
      console.log(info.response);
      //   res
      //     .sendStatus(200)
      //     .send({ message: "please check mail for password reset link" });
    }
  });
}
