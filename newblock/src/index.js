import express from "express";
import bodyparser from "body-parser";
import { getBlockRouter } from "./routes/getBlock.js";
import { createBlockRouter } from "./routes/newblock.js";
import { updateBlockRouter } from "./routes/updateBlock.js";
const app = express();
app.use(bodyparser.json());

app.listen(3000, () => {
  console.log("new block listing on 3000");
});
