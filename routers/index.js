const { auth } = require("./authLogin.routes");
const { characters } = require("./characters.routes");
const { movies } = require("./movies.routes");
const { gender } = require("./gender.routes");

module.exports = {
  auth,
  characters,
  movies,
  gender,
};
