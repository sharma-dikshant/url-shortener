const express = require("express");

const {
  handleGenerateShortUrl,
  handleShowAnalytics,
  handleRedirect,
} = require("../controllers/urlControllers");

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/analytics/:shortId", handleShowAnalytics);
//dynamic route for redirect
router.get("/:shortId", handleRedirect);

module.exports = router;
