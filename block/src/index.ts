import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo uri must be defined");
  }
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
    console.log("Listening on port 3000 !");
  });
};

start();
