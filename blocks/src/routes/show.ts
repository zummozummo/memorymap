import express, { Request, Response } from "express";
import { NotFoundError } from "@sgtickets/common";
import { Block } from "../models/block";

const router = express.Router();

router.get("/api/blocks/:id", async (req: Request, res: Response) => {
  const block = await Block.findById(req.params.id);

  if (!block) {
    throw new NotFoundError();
  }

  res.send(block);
});

export { router as showBlockRouter };
