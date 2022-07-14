const { request, response } = require("express");

const prueva = (req = request, res = response) => {
  res.send("Hola mundo");
};

module.exports = {
  prueva,
};
