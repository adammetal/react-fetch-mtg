const { Router } = require("express");
const CardNames = require("./names.schema");

const names = new Router();

names.get("/", async (req, res) => {
  const query = req?.query?.q?.toLowerCase() ?? "";

  const option = {};

  if (query) {
    option.name = {
      $regex: query,
      $options: "i",
    }
  }
  
  const names = await CardNames.find(option);

  return res.json(names);
});

module.exports = names;
