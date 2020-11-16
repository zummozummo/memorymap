import express from "express";

import { currentUser } from "@sgtickets/common";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null }); //actual json payload
});

export { router as currentUserRouter };
