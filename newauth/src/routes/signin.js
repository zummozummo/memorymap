import express from "express";
import { body } from "express-validator";
import bycrpt from "bcrypt";
import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation-error.js ";
import BadRequestError from "../errors/bad-request-error.js";
const router = express.Router();

router.post(
  "/api/auth/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be b/w 4 and 20 characters"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validation errro");
      return next(new RequestValidationError(errors.array()));
    }
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new BadRequestError("Invalid Credentials"));
    }
    console.log(existingUser);
    const passwordsMatch = await bycrpt.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      return next(new BadRequestError("Invalid Cred"));
    } else {
      const userJWT = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          verified: existingUser.verified,
          googleId: existingUser.googleId,
        },
        process.env.JWT_KEY
      );
      res.cookie("jwt", userJWT, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
      res.status(200).send(existingUser);
    }
  }
);

export { router as signinRouter };
