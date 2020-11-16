import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "@sgtickets/common";
import { NotFoundError } from "@sgtickets/common";
const app = express();
//to make sure that express is behind a proxy engress_Enginx
//and it should trust traffic even though its coming from that proxy
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

//this is named export that why {}
export { app };
