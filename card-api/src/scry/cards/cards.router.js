const { request } = require("https");
const { Router } = require("express");

const scry = new URL("https://api.scryfall.com/cards/search");
scry.searchParams.set("unique", "cards");
scry.searchParams.set("order", "released");

const cards = new Router();

cards.get("/", (req, res) => {
  const query = req?.query?.q ?? "";
  scry.searchParams.set("q", query);

  const scryReq = request(scry, (scryRes) => {
    scryRes.pipe(res);
  });

  scryReq.end();
});

module.exports = cards;
