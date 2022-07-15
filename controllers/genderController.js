const { request, response } = require("express");
const prueva = (req = request, res = response) => {
  res.send("genero");
};

module.exports = {
  prueva,
};
