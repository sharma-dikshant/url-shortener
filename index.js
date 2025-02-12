const express = require("express");
const path = require("path");
const { connectToDB } = require("./configDB");

//routers
const urlRouter = require("./routes/urlRouters");
const homeRouter = require("./routes/HomeRouter");
const URL = require("./models/urlModel");

const app = express();
const PORT = 8000;

//setting ejs as view engine
app.set("view engine", "ejs");
//setting views directory
app.set("views", path.resolve("./views"));

connectToDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRouter);
app.use("/", homeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
