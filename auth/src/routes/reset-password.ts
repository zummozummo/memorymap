import { BadRequestError, validateRequest } from "@mem_map/common";
import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Password } from "../service/password";
const router = express.Router();
import { Request, Response } from "express";
import { body } from "express-validator";
router.get(
  "/api/users/reset-password/:id/:token",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, token } = req.params;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      //throw not valid user
      return next(new BadRequestError("Not a Valid User"));
    }
    console.log("user" + existingUser);
    const verify_sec = "asdf" + existingUser?.password;
    try {
      const payload = jwt.verify(token, verify_sec);
      res.send({ email: existingUser?.email });
    } catch (error) {
      console.log(error);
      return next(new BadRequestError("JWT error"));
    }
  }
);

router.put(
  "/api/users/reset-password/:id/:token",
  [
    body("password")
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be b/w 4 and 20 characters"),
    body("password2")
      .isLength({ min: 4, max: 20 })
      .withMessage("Password2 must be b/w 4 and 20 characters"),
    body("password")
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          return false;
        }
        // Indicates the success of this synchronous custom validator
        return true;
      })
      .withMessage("Passwords don't match"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, token } = req.params;
    const { password, password2 } = req.body;
    const existingUser = await User.findOne({ id });
    if (!existingUser) {
      //throw not valid user
      console.log("not valid user");
      return next(new BadRequestError("Not a Valid User"));
    }
    //check if the token is valid
    const verify_sec = "asdf" + existingUser.password;
    try {
      const payload = jwt.verify(token, verify_sec);
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
      console.log(error);
      return next(new BadRequestError("JWT error"));
    }
    res.sendStatus(204);
  }
);

export { router as resetPasswordRouter };
