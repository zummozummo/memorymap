import express, { Request, Response } from "express";
import { requireAuth } from "@mem_map/common";
import { Block } from "../models/block";
const router = express.Router();

router.get(
  "/api/block/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const existingBlock = await Block.findOne({ id });
      console.log(existingBlock);
      if (existingBlock) {
        res.send(existingBlock);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      throw Error("DB error");
    }
  }
);

export { router as getBlockRouter };
