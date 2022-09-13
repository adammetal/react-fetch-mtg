const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const namesPath = path.join(__dirname, "card-names.json");
const namesFile = fs.readFileSync(namesPath, { encoding: "utf-8" });
const namesJson = JSON.parse(namesFile);

app.get("/api/cards", (req, res) => {
  res.json(namesJson.data);
});

app.listen(8080);
