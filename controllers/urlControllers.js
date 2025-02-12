const { nanoid } = require("nanoid");
const URL = require("../models/urlModel");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortUrl = nanoid(6);
  await URL.create({
    shortId: shortUrl,
    redirectURL: body.url,
    visitedHistory: [],
  });

  return res.json({ shortUrl: shortUrl });
}

async function handleShowAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  return res.json({
    totalClicks: entry.visitedHistory.length,
    analytics: entry.visitedHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleShowAnalytics,
};
