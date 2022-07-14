const { Router } = require("express");
const {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
} = require("../controllers/charactersController");

const router = Router();

router.get("/", characterListOrSearch);
router.post("/", createCharacter);
router.put("/", editCharacter);
router.delete("/", deleteCharacter);

module.exports = {
  characters: router,
};
