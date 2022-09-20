const { verify } = require("./auth.model");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  let user;

  try {
    user = await verify(token);
  } catch(err) {
    return next(err);
  }

  if (!user) {
    return res.status(401).end();
  }

  req.auth = user;

  next();
};
