import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import { User } from "../models/user.js";
const router = express.Router();
router.get("/api/auth/currentuser", async (req, res) => {
  const jwt_cookie = req.cookies["jwt"];
  console.log(jwt_cookie + "cookie not present");
  if (!jwt_cookie) {
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(jwt_cookie, process.env.JWT_KEY);
    res.send({ currentUser: payload });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
