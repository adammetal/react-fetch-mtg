const { Router } = require("express");
const { signup, signin } = require("./auth.model");
const verify = require("./verify.middleware");

const auth = new Router();

auth.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).end("Missing credentials");
  }

  try {
    const user = await signup(email, password);
    return res.json(user);
  } catch (err) {
    next(err);
  }
});

auth.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).end("Missing credentials");
  }

  try {
    const token = await signin(email, password);

    if (!token) {
      return res.status(401).end();
    }

    return res.json({ token });
  } catch (err) {
    next(err);
  }
});

auth.get("/me", verify, (req, res) => {
  return res.json(req.auth);
});

module.exports = auth;
