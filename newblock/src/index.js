import express from "express";
import bodyparser from "body-parser";
import { getBlockRouter } from "./routes/getBlock.js";
import { createBlockRouter } from "./routes/newblock.js";
import { updateBlockRouter } from "./routes/updateBlock.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error-handler.js";
import mongoose from "mongoose";
const app = express();
app.use(bodyparser.json());

app.set("trust proxy", true);
app.use(cookieParser());
app.use(getBlockRouter);
app.use(createBlockRouter);
app.use(updateBlockRouter);

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
  console.log("Still");
});

app.use(errorHandler);
const start = async () => {
  if (!process.env.ATLAS_PASS) {
    throw new Error("atlas pass not provided");
  }
  try {
    //await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect(
      `mongodb+srv://memorymap:${process.env.ATLAS_PASS}@memorymap.qouo7.mongodb.net/block?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.error(err);
  }
  console.log("connect to mongodb block");
  app.listen(3000, () => {
    console.log("new block listing on 3000");
  });
};
start();
