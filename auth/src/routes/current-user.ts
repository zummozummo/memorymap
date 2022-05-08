import express from "express";
import { currentUser } from "@mem_map/common";
import { User } from "../models/user";
const router = express.Router();
router.get("/api/users/currentuser", currentUser, async (req, res) => {
  const email = req.currentUser?.email;
  const checkUserInDB = await User.findOne({ _id: req.currentUser?.id });
  console.log(checkUserInDB);
  if (checkUserInDB) {
    res.send({ currentUser: req.currentUser });
  } else {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
