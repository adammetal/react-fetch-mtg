const express = require("express");
const mongoose = require("mongoose");
const cards = require("./src/cards");
const names = require("./src/names/names.router");

const app = express();

app.use("/api/names", names);
app.use("/api/cards", cards);

const MONGO_URL = "mongodb://adam:123@localhost:27017/mtg";

mongoose.connect(MONGO_URL).then(() => {
  app.listen(8080, () => {
    console.log("App is running on 8080");
  });
});
