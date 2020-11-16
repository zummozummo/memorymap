import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@sgtickets/common";
import { Block } from "../../src/models/block";

const router = express.Router();

router.post(
  "/api/blocks",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const block = Block.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await block.save();
    res.sendStatus(201).send(block);
  }
);

export { router as createBlockRouter };
