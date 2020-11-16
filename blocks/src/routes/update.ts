import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@sgtickets/common";
import { Block } from "../models/block";

const router = express.Router();

router.put(
  "/api/blocks/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const block = await Block.findById(req.params.id);

    if (!block) {
      throw new NotFoundError();
    }
    if (block.userId !== req.currentUser!.id) {
      console.log(block.userId);
      throw new NotAuthorizedError();
    }
    block.set({
      title: req.body.title,
      price: req.body.price,
    });
    await block.save();
    res.send(block);
  }
);

export { router as updateBlockRouter };
