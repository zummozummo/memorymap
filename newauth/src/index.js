import express from "express";
import bodyparser from "body-parser";
import { currentUserRouter } from "./routes/current-user.js";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { signoutRouter } from "./routes/signout.js";
import { errorHandler } from "./middlewares/error-handler.js";
import NotFoundError from "./errors/not-found-error.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { User } from "../models/user.js";
const app = express();
app.set("trust proxy", true);
app.use(bodyparser.json());
app.use(cookieParser());
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
  console.log("Still");
});

app.use(errorHandler);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  try {
    await mongoose.connect(
      `mongodb+srv://memorymap:${process.env.ATLAS_PASS}@memorymap.qouo7.mongodb.net/auth?retryWrites=true&w=majority`
    );
    console.log("connected to mongo new auth");
  } catch (err) {
    throw new Error("DB connection Error");
  }
  app.listen(3000, () => {
    console.log("listing on 3000 new-auth");
  });
};
start();
