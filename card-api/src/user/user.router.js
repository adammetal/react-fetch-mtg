const { Router } = require("express");
const UserModel = require("./user.schema");
const verify = require("../auth/verify.middleware");
const decks = require("./deck/deck.router");

const user = new Router();

user.use(verify, async (req, res, next) => {
  const user = await UserModel.findById(req.auth.user);
  req.user = user;
  next();
});

user.get("/", (req, res) => {
  return res.json(req.user);
});

user.use("/decks", decks);

module.exports = user;
