const mongoose = require("mongoose");
const database = require("./src/database");
const NamesModel = require("./src/names/names.schema");
const DeckModel = require("./src/deck/deck.schema");

const MONGO_URL = "mongodb://adam:123@localhost:27017/mtg";

const initNames = async () => {
  await NamesModel.deleteMany({});

  const names = database.getCardNames();

  const tasks = names.map((name) => {
    return NamesModel.create({ name, rarity: 1 });
  });

  return Promise.all(tasks);
};

const initDeck = () => {
  return DeckModel.create({ name: "Demo", cards: [] });
};

mongoose
  .connect(MONGO_URL)
  .then(() => {
    return initNames();
  })
  .then(() => {
    return initDeck();
  })
  .then(() => {
    mongoose.disconnect();
  });
