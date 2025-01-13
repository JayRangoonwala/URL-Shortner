import shortid from "shortid";
import { URL } from "../models/url.js";
import express from "express";

export async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  const user = req.user;

  if (user.id) {
    if (!body.url) return res.status(400).json({ error: "Please Enter Url" });

    const shortID = shortid.generate(8);
    await URL.create({
      shortid: shortID,
      redirecturl: body.url,
      visited: [],
      createdby: user.id,
    });

    return res.json({ shorturl: shortID });
  }
}

export async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortid: shortId,
    },
    {
      $push: {
        visited: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.status(200).json({ redirectUrl: entry.redirecturl });
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const url = await URL.findOne({
    shortid: shortId,
  });

  if (!url) return res.status(404).json({ error: "Invalid ShortId" });

  res.json({ Visited: url.visited.length });
}
