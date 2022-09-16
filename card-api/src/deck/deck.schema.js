const mongoose = require("mongoose");

const { Schema } = mongoose;

const DeckSchema = new Schema({
  name: String,
  cards: [
    {
      name: String,
      note: String,
    },
  ],
});

module.exports = mongoose.model("Deck", DeckSchema);
