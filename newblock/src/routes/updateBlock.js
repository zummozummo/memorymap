import express from "express";
import { body } from "express-validator";
import { Block } from "../models/block.js";
import RequireAuth from "../errors/require-auth.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import BadRequestError from "../errors/bad-request-error.js";
import RequestValidationError from "../errors/request-validation-error.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.put(
  "/api/block/:id",
  [
    body("type").trim().notEmpty().withMessage("type should be specified"),
    body("value").notEmpty().withMessage("Value should be specified"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validation errro");
      return next(new RequestValidationError(errors.array()));
    }
    const { value, type } = req.body;
    const { id } = req.params;
    console.log(type);
    console.log(value);
    try {
      const jwt_cookie = req.cookies["jwt"];
      console.log(jwt_cookie);
      const payload = jwt.verify(jwt_cookie, process.env.JWT_KEY);
      console.log(payload);
      if (type === "editor") {
        const existingblock = await Block.findOne({ _id: id });
        if (existingblock) {
          const block = await Block.findOneAndUpdate(
            { id },
            { value: value },
            {
              new: true,
            }
          );
          res.send(block);
        }
      }
    } catch (err) {
      console.log(err);
      return next(new RequireAuth("Not authorized"));
    }
  }
);

export { router as updateBlockRouter };
