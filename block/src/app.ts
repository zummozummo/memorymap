import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@mem_map/common";
import { createBlockRouter } from "./routes/newblock";
import { getBlockRouter } from "./routes/getBlock";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);
app.use(createBlockRouter);
app.use(getBlockRouter);
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);
export { app };
