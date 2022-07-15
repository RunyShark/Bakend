const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
} = require("../controllers/charactersController");
const { characterExist } = require("../helpers/dbValidators");

const router = Router();

router.get("/", characterListOrSearch);
router.put("/", editCharacter);
router.delete("/", deleteCharacter);
router.post(
  "/",
  [
    check("imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("nombre", "El campo  nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(characterExist),
    check("edad", "El campo  edad es obligatorio").not().isEmpty(),
    check("peso", "El campo  peso es obligatorio").not().isEmpty(),
    check("historia", "El campo historia es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  createCharacter
);

module.exports = {
  characters: router,
};
