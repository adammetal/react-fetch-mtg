const mongoose = require("mongoose");

const { Schema } = mongoose;

const NamesSchema = new Schema({
  name: String,
  rarity: Number,
});

module.exports = mongoose.model("Names", NamesSchema);
