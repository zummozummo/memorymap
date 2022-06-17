import express from "express";
import { body } from "express-validator";
import { Block } from "../models/block.js";
import RequireAuth from "../errors/require-auth.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import BadRequestError from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/api/block", async (req, res, next) => {
  const { value, type } = req.body;
  console.log(type);
  console.log(value);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errro");
    return next(new RequestValidationError(errors.array()));
  }
  try {
    const jwt_cookie = req.cookies["jwt"];
    console.log(jwt_cookie);
    const payload = jwt.verify(jwt_cookie, process.env.JWT_KEY);
    console.log(payload);
    if (type === "sidebar") {
      const id = payload.id;
      const existingblock = await Block.findOne({ _id: id });
      console.log(existingblock);
      if (existingblock) {
        return next(new BadRequestError("No setup required"));
      } else {
        const sidebar = await createInitialWorkspace();
        const block = new Block({ _id: id, type, value: sidebar });
        await block.save();
        //console.log(sidebar);
        res.status(201).send(block);
      }
    }
  } catch (err) {
    console.log(err);
    return next(new RequireAuth("Not authorized"));
  }
});

export { router as createBlockRouter };

async function createInitialWorkspace() {
  const createFolder1 = { type: "editor", value: [] };
  const createFolder2 = { type: "editor", value: [] };
  const createFile1 = { type: "editor", value: [] };
  const block1 = new Block(createFolder1);
  await block1.save();
  const block2 = new Block(createFolder2);
  await block2.save();
  const block3 = new Block(createFile1);
  await block3.save();
  console.log("go" + block1["_id"].toString());
  const structure = [
    {
      id: block1["_id"].toString(),
      type: "folder",
      name: "untitled",
      access: "public",
      users: [],
      files: [
        {
          id: block2["_id"].toString(),
          type: "folder",
          name: "Components",
          files: [
            {
              id: block3["_id"].toString(),
              type: "file",
              name: "untitledfile",
            },
          ],
        },
      ],
    },
  ];
  //const sidebar = await new Block({ type: "sidebar", value: structure });
  return structure;
}
