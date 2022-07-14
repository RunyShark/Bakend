const { auth } = require("./authLogin.routes");
const { characters } = require("./characters.routes");
const { movies } = require("./movies.routes");

module.exports = {
  auth,
  characters,
  movies,
};
