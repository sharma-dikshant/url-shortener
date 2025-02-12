const express = require("express");

const {
  handleGenerateShortUrl,
  handleShowAnalytics,
} = require("../controllers/urlControllers");

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/analytics/:shortId", handleShowAnalytics);

module.exports = router;
