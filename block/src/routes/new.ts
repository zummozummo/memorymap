import express, { Request, response, Response } from "express";
import { requireAuth, validateRequest, BadRequestError } from "@mem_map/common";
import { Block } from "../models/block";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
const router = express.Router();

//will be used to create dummy sidebar when user signup first time
router.post(
  "/api/block",
  [
    body("type").trim().notEmpty().withMessage("type should be specified"),
    body("value").notEmpty().withMessage("Value should be specified"),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { type, value } = req.body;
    try {
      if (type === "sidebar") {
        const id = req.currentUser?.id;
        const block = new Block({ id, type, value });
        await block.save();
        res.send(block);
      } else if (type === "editor") {
        const id = new ObjectId();
        console.log(id);
        const block = new Block({ id, type, value });
        await block.save();
        res.send({ id, type });
      }
    } catch (err) {
      throw new Error("Something went wrong...");
    }
  }
);

export { router as createSidebarRouter };
