const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const AuthModel = require("./auth.schema");
const UserModel = require("../user/user.schema");
const { default: mongoose } = require("mongoose");

const SALT = "12345";

const pbkdf2 = (password, cb) =>
  crypto.pbkdf2(password, SALT, 1000, 64, "sha512", cb);

const createHash = (password) =>
  new Promise((resolve, reject) => {
    pbkdf2(password, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

const verifyPassword = async (password, hash) => {
  return (await createHash(password)).toString() === hash;
};

const findUserByEmail = async (email) => {
  const user = await AuthModel.findOne({ email });

  if (!user) {
    return null;
  }

  return user;
};

const createUser = async (email, password) => {
  const hash = await createHash(password);

  const authEntry = await AuthModel.create({
    password: hash,
    email,
  });

  const userEntry = await UserModel.create({ decks: [], auth: authEntry._id });

  authEntry.user = userEntry._id;
  await authEntry.save();

  return authEntry;
};

const createJwtToken = (user) =>
  new Promise((resolve, reject) => {
    const payload = {
      email: user.email,
      _id: user._id,
    };

    jwt.sign(payload, SALT, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });

const verifyJwtToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SALT, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });

const signup = (email, password) => {
  return createUser(email, password);
};

const signin = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return false;
  }

  const ok = await verifyPassword(password, user.password);

  if (!ok) {
    return false;
  }

  return createJwtToken(user);
};

const verify = async (token) => {
  const decoded = await verifyJwtToken(token);

  if (!decoded) {
    return false;
  }

  const { email } = decoded;
  const user = findUserByEmail(email);

  if (!user) {
    return false;
  }

  return user;
};

module.exports = {
  signin,
  signup,
  verify,
};
