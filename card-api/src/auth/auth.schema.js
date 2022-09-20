const mongoose = require("mongoose");

const { Schema } = mongoose;

const AuthSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
