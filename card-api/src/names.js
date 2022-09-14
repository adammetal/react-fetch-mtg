const { Router } = require("express");
const { getCardNames } = require("./database");

const names = new Router();

names.get("/", (req, res) => {
  const query = req?.query?.q?.toLowerCase() ?? "";
  const names = getCardNames();

  if (query) {
    const filtered = names.filter((name) => name.toLowerCase().includes(query));
    return res.json(filtered);
  }

  return res.json(names);
});

module.exports = names;
