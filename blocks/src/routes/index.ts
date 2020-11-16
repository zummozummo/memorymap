import express, { Request, Response } from "express";
import { Block } from "../models/block";

const router = express.Router();

router.get("/api/blocks", async (req: Request, res: Response) => {
  console.log("hey");
  const blocks = await Block.find({});
  res.send(blocks);
});

export { router as indexBlockRouter };
