import postService from "../services/posts.service";
import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";

const client_secret = process.env.CLIENT_SECRET;
const auth0_domain = process.env.AUTH0_DOMAIN;
const auth0_client_id = process.env.AUTH0_CLIENT_ID;

if (!client_secret || !auth0_domain || !auth0_client_id) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const axios = require("axios").default;
const NodeCache = require("node-cache");
const cache = new NodeCache();

export const authRouter = express.Router();

authRouter.post("/email-verify", validateAccessToken, async (req, res) => {
  const user_id = req.auth?.payload.sub as string;

  if (!user_id) {
    res.status(400).json({ error: "Username not provided" });
    return;
  }

  // Check if the request data already exists in the cache for this user
  const TTL = 60; // seconds
  const cacheKey = `user:${user_id}:my-request:email-verify`;
  const cacheResult = cache.get(cacheKey);
  if (cacheResult) {
    return res.status(400).json({
      message: `This request has already been sent within the last ${TTL} seconds. Please wait a bit before trying again.`,
    });
  }

  var options = {
    method: "POST",
    url: `https://${auth0_domain}/oauth/token`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: auth0_client_id,
      client_secret: client_secret,
      audience: `https://${auth0_domain}/api/v2/`,
    }),
  };

  const management_api_token = await axios
    .request(options)
    .then(function (response: { data: any }) {
      return response.data.access_token;
    })
    .catch(function (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error obtaining API key sending verification email" });
    });

  var options_verify = {
    method: "POST",
    url: `https://${auth0_domain}/api/v2/jobs/verification-email`,
    headers: {
      authorization: `Bearer ${management_api_token}`,
      "content-type": "application/json",
    },
    data: { user_id: user_id },
  };

  // Set the TTL value for this cache key to 60 seconds
  cache.set(cacheKey, true, TTL);

  await axios
    .request(options_verify)
    .then((response: any) => {
      res.status(200).json({ message: "Verification email sent" });
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).json({ error: "Error sending verification email" });
    });
});
