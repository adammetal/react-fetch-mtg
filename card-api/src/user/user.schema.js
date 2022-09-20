const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  decks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Deck",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
