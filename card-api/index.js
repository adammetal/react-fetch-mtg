const express = require("express");
const mongoose = require("mongoose");
const cards = require("./src/scry/cards/cards.router");
const names = require("./src/names/names.router");
const auth = require("./src/auth/auth.router");
const user = require("./src/user/user.router");

const app = express();

app.use(express.json());

app.use("/api/scry/cards", cards);
app.use("/api/names", names);
app.use("/api/auth", auth);
app.use("/api/user", user);

const MONGO_URL = "mongodb://adam:123@localhost:27017/mtg";

mongoose.connect(MONGO_URL).then(() => {
  app.listen(8080, () => {
    console.log("App is running on 8080");
  });
});
