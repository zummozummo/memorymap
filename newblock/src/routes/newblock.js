import express from "express";
import { body } from "express-validator";
const router = express.Router();

router.post("/api/block", async (req, res) => {
  res.send("hello");
});

export { router as createBlockRouter };
