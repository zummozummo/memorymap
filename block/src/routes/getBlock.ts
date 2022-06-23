import express, { NextFunction, Request, Response } from "express";
import { NotFoundError, requireAuth } from "@mem_map/common";
import { Block } from "../models/block";
const router = express.Router();

//get block, request url should contain the id
router.get(
  "/api/block/:id",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const existingBlock = await Block.findOne({ _id: id });
      if (existingBlock) {
        res.send(existingBlock);
      } else {
        throw next(new NotFoundError());
      }
    } catch (err) {
      next(err);
    }
  }
);

export { router as getBlockRouter };
