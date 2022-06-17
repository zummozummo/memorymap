import express from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation-error.js";
import { User } from "../../models/user.js";
import BadRequestError from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be b/w 4 and 20 characters"),
  ],
  async (req, res, next) => {
    console.log("Singup");
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }
    const { email } = req.body;
    const { password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      console.log("email in use");
      return next(new BadRequestError("Email in use"));
    } else {
      const user = new User({
        email,
        password,
        verified: "false",
        googleId: "false",
      });
      //geneerate jwt
      const userJWT = jwt.sign(
        {
          id: user.id,
          email: user.email,
          verified: user.verified,
          googleId: user.googleId,
        },
        process.env.JWT_KEY
      );
      res.cookie("jwt", userJWT, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000000,
      });
      await user.save();
      console.log(user);
      res.status(201).send(user);
    }
  }
);

export { router as signupRouter };
