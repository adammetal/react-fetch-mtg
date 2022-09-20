const mongoose = require("mongoose");

const { Schema } = mongoose;

const DeckSchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cards: [
    {
      name: String,
      image: String,
      note: String,
    },
  ],
});

module.exports = mongoose.model("Deck", DeckSchema);
