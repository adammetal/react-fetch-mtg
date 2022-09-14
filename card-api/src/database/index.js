const path = require("path");
const fs = require("fs");

const namesPath = path.join(__dirname, "card-names.json");
const namesFile = fs.readFileSync(namesPath, { encoding: "utf-8" });
const namesJson = JSON.parse(namesFile);

const getCardNames = () => namesJson.data;

module.exports = { getCardNames };
