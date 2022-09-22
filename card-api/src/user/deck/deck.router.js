const { Router } = require("express");
const DeckModel = require("./deck.schema");

const deck = new Router();

deck.use("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!req.user.decks.includes(id)) {
    return res.status(400).end();
  }

  req.deck = await DeckModel.findById(id);
  next();
});

deck.get("/", (req, res) => {
  return res.json(req.user.decks);
});

deck.get("/:id", (req, res) => {
  return res.json(req.deck);
});

deck.post("/", async (req, res) => {
  const { name } = req.body;

  const newDeck = await DeckModel.create({ name, user: req.user._id });

  req.user.decks.push(newDeck);
  await req.user.save();

  return res.json(newDeck);
});

module.exports = deck;
