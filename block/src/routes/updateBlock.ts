import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@mem_map/common";
import { Block } from "../models/block";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
const router = express.Router();

router.put(
  "/api/block",
  [
    body("id").trim().notEmpty().withMessage("id should be specified"),
    body("type").trim().notEmpty().withMessage("type should be specified"),
    body("value").notEmpty().withMessage("Value should be specified"),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { value, id } = req.body;
    const updateValue = { value: value };
    const block = await Block.findOneAndUpdate({ id }, updateValue);
    res.send(block);
  }
);

export { router as updateBlockRouter };
