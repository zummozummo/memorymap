import { BadRequestError, NotFoundError } from "@mem_map/common";
import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { sendEmail } from "../service/sendmail";
const router = express.Router();

router.get(
  "/api/users/verifyEmail/:id/:token",
  async (req, res, next: NextFunction) => {
    const { id, token } = req.params;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      console.log("not valid user");
      return next(new BadRequestError("Not a Valid User"));
    }
    //check if the token is valid
    console.log(existingUser.password);
    const verify_sec = "asdf" + existingUser.password;
    try {
      const payload = jwt.verify(token, verify_sec);
    } catch (err) {
      console.log(err);
      return next(new BadRequestError("jwt error"));
    }
    try {
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
    const verify_sec = "asdf" + existingUser.password;
    const payload = {
      email: existingUser.email,
      id: existingUser.id,
    };
    const token = jwt.sign(payload, verify_sec, { expiresIn: "10m" });
    const link = `http://memorymap.dev/api/users/reset-password/${existingUser.id}/${token}`;
    console.log(link);
    try {
      sendEmail(existingUser.email, link);
    } catch (err) {
      console.log(err);
    } finally {
      res.sendStatus(200);
    }
  }
);

export { router as forgotPasswordRouter };
