import express from "express";
import { Block } from "../models/block.js";
import NotFoundError from "../errors/not-fount-error.js";
import BadRequestError from "../errors/bad-request-error.js";
const router = express.Router();

//get block, request url should contain the id
router.get("/api/block/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingBlock = await Block.findOne({ _id: id });
    if (existingBlock) {
      res.send(existingBlock);
    } else {
      return next(new NotFoundError("Resource not found"));
    }
  } catch (err) {
    console.log(err);
  }
});

export { router as getBlockRouter };
