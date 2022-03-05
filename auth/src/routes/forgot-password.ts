import { BadRequestError, NotFoundError } from "@mem_map/common";
import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserAttr } from "../models/user";
import { Password } from "../service/password";
const router = express.Router();

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
    res.send({ currentUser: "Send mail to user with the reset link" });
  }
);

router.get(
  "/api/users/forgotPassword/:id/:token",
  async (req, res, next: NextFunction) => {
    const { id, token } = req.params;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      //throw not valid user
      console.log("not valid user");
    }
    console.log(existingUser);
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
  "/api/users/forgotPassword/:id/:token",
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
      console.log(existingUser);
      //res.send({ email: existingUser?.email });
    } catch (error) {
      console.log(error);
      res.send(error);
    }

    console.log(existingUser);
    res.send(existingUser);
  }
);

export { router as forgotPasswordRouter };
