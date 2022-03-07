import { BadRequestError, NotFoundError } from "@mem_map/common";
import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserAttr } from "../models/user";
import { Password } from "../service/password";
import nodemailer from "nodemailer";
const router = express.Router();

router.get(
  "/api/users/verifyEmail/:id/:token",
  async (req, res, next: NextFunction) => {
    const { id, token } = req.params;
    console.log(id);
    console.log(token);
    const existingUser = await User.findOne({ id });
    console.log(existingUser);
    if (!existingUser) {
      //throw not valid user
      console.log("not valid user");
      return;
    }
    //check if the token is valid
    console.log(existingUser.password);
    const secret = "asdf" + existingUser.password;
    try {
      const payload = jwt.verify(token, secret);

      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          verified: "true",
        },
        { new: true }
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    res.sendStatus(200);
  }
);
router.post(
  "/api/users/forgotPassword",
  async (req, res, next: NextFunction) => {
    const { email } = req.body;

    //check if email exist in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser._id.toString());
    } else {
      return next(new BadRequestError("Email not registerd"));
    }
    //user exist and now creat one time link valid for 10min
    const secret = "asdf" + existingUser.password;
    const payload = {
      email: existingUser.email,
      id: existingUser.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "10m" });
    const link = `http://memorymap.dev/api/users/reset-password/${existingUser.id}/${token}`;
    console.log(link);
    //send link to mail
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@mapourmind.com",
        pass: process.env.MAIL_PASS,
      },
    });
    const options = {
      from: "noreply@mapourmind.com",
      to: existingUser.email,
      subject: "Reset Password",
      text: link,
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        res
          .sendStatus(503)
          .send({ message: "unable to send mail, please retry" });
      } else {
        console.log(info.response);
        res
          .sendStatus(200)
          .send({ message: "please check mail for password reset link" });
      }
    });
  }
);

router.get(
  "/api/users/reset-password/:id/:token",
  async (req, res, next: NextFunction) => {
    const { id, token } = req.params;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      //throw not valid user
      console.log("not valid user");
    }
    console.log("user" + existingUser);
    const secret = "asdf" + existingUser?.password;
    try {
      const payload = jwt.verify(token, secret);
      res.send({ email: existingUser?.email });
    } catch (error) {
      res.send(error);
    }
  }
);

router.post(
  "/api/users/reset-password/:id/:token",
  async (req, res, next: NextFunction) => {
    const { id, token } = req.params;
    const { password, password2 } = req.body;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      //throw not valid user
      console.log("not valid user");
      return;
    }
    //check if the token is valid
    const secret = "asdf" + existingUser.password;
    try {
      const payload = jwt.verify(token, secret);
      //validate password and password2
      //find the user with id and email and update the password
      const hashed = await Password.toHash(password);
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          password: hashed,
        },
        { new: true }
      );
      console.log(user);
    } catch (error) {
      res.send(error);
    }
    res.sendStatus(200);
  }
);

export { router as forgotPasswordRouter };
