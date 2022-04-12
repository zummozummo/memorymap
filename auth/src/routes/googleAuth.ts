import express, { NextFunction } from "express";
import querystring from "querystring";
const router = express.Router();

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "https://memorymap.dev/api/users/google/callback",
    client_id:
      "573267777115-176069s8o4ghodq0qmo541otoqv1nv83.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

router.get("/api/users/google", (req, res) => {
  return res.send(getGoogleAuthURL());
});

export { router as GoogleAuth };
