const { request, response } = require("express");

const characterListOrSearch = (req = request, res = response) => {
  //*name,age,movie
  res.send("listCharacters");
};

const createCharacter = (req = request, res = response) => {
  res.send("createCharacter");
};

const editCharacter = (req = request, res = response) => {
  res.send("EditCharacter");
};
const deleteCharacter = (req = request, res = response) => {
  res.send("deleteCharacter");
};

module.exports = {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
};
