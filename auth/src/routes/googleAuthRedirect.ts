import express, { NextFunction } from "express";
import querystring from "querystring";
const router = express.Router();
import { User, UserAttr } from "../models/user";
import axios from "axios";
import jwt from "jsonwebtoken";
function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<{
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}> {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      throw new Error(error.message);
    });
}

router.get("/api/users/google/callback", async (req, res) => {
  console.log(req.session);
  const code = req.query.code as string;

  const { id_token, access_token } = await getTokens({
    code,
    clientId:
      "573267777115-176069s8o4ghodq0qmo541otoqv1nv83.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_SEC || "",
    redirectUri: "https://memorymap.dev/api/users/google/callback",
  });
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
  console.log(googleUser);
  const { id, email, name, verified_email } = googleUser;
  const existingUser = await User.findOne({ id: id });
  if (!existingUser) {
    const user = new User({ email, verified: verified_email, googleId: id });
    await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: email,
        type: "google",
      },
      process.env.JWT_KEY!
    );

    req.session!.jwt = userJWT;
    console.log("new user");
    res.redirect("https://memorymap.dev");
    //res.status(200).send(user);
  } else {
    const existingUser = await User.findOne({ googleId: id });
    console.log("existing user");
    console.log(existingUser);
    if (existingUser) {
      const userJWT = jwt.sign(
        {
          id: existingUser.id,
          email: email,
          type: "google",
        },
        process.env.JWT_KEY!
      );
      req.session!.jwt = userJWT;
    }
    console.log(req.session!.jwt);
    res.redirect("https://memorymap.dev");
  }
});

export { router as googleRedirect };
