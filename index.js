const express = require("express");
const { connectToDB } = require("./configDB");

//routers
const urlRouter = require("./routes/urlRouters");
const URL = require("./models/urlModel");

const app = express();
const PORT = 8000;

connectToDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/url", urlRouter);

//dynamic route for redirect
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: { timestamp: Date.now() },
      },
    }
  );
  console.log(entry);
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
