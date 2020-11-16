import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { validateRequest } from "@sgtickets/common";
import { BadRequestError } from "@sgtickets/common";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log("inside");
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      console.log("user does not exits");
      throw new BadRequestError("Invalid credentials");
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    console.log(passwordsMatch);
    if (!passwordsMatch) {
      console.log("password does not match");
      throw new BadRequestError("Invalid credentials");
    }
    //generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! //! means dont worry about it
    );

    //store it on session Object
    req.session = {
      jwt: userJwt,
    };
    console.log("just before sned");
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
