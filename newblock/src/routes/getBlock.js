import express from "express";
// import { Block } from "../models/block";
const router = express.Router();

//get block, request url should contain the id
router.get("/api/block/:id", async (req, res, next) => {
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
});

export { router as getBlockRouter };
