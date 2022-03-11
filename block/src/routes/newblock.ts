import express, { NextFunction, Request, Response } from "express";
import { requireAuth, validateRequest, BadRequestError } from "@mem_map/common";
import { Block } from "../models/block";
import { ObjectId } from "mongodb";
import { body } from "express-validator";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

//request should contain type and value
//Used to create sidebar when user signup first time
//Used to create editor block when user adds a new file -> response will be a new id for sidebar file
router.post(
  "/api/block",
  [body("type").trim().notEmpty().withMessage("type should be specified")],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { type, value } = req.body;
    console.log(value);
    if (type === "sidebar") {
      const id = req.currentUser?.id;
      const block = new Block({ id, type, value });
      await block.save();
      res.status(201).send(block);
    } else if (type === "editor-file") {
      if (typeof value == "undefined" && value == null) {
        return next(new BadRequestError("Value must be specified"));
      }
      const id = uuidv4();
      console.log(id);
      const block = new Block({ id, type, value });
      await block.save();
      res.status(201).send({ id, type, value });
    } else if (type === "editor-folder") {
      const id = uuidv4();
      console.log(id);
      res.status(201).send({ id, type });
    }
  }
);

export { router as createBlockRouter };
