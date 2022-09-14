const { request } = require("node:https");
const { Router } = require("express");

const scry = new URL("https://api.scryfall.com/cards/search");

const cards = new Router();

cards.get("/", (req, res) => {
  const query = req?.query?.q ?? "";
  scry.searchParams.set("q", query);
  scry.searchParams.set("unique", "cards");
  scry.searchParams.set("order", "released");
  const scryReq = request(scry, (scryRes) => {
    scryRes.pipe(res);
  });
  scryReq.end();
});

module.exports = cards;
