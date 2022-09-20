const { Router } = require("express");
const DeckModel = require("./deck.schema");

const deck = new Router();

deck.get("/", (req, res) => {
  return res.json(req.user.decks);
});

deck.post("/", async (req, res) => {
  const { name } = req.body;

  const newDeck = await DeckModel.create({ name, user: req.user._id });

  req.user.decks.push(newDeck);
  await req.user.save();

  return res.json(newDeck);
});

module.exports = deck;
