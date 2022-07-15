const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
} = require("../controllers/charactersController");

const router = Router();

router.get("/", characterListOrSearch);
router.put("/", editCharacter);
router.delete("/", deleteCharacter);
router.post(
  "/",
  [
    check("Imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("Nombre", "El campo  nombre es obligatorio").not().isEmpty(),
    check("Edad", "El campo  edad es obligatorio").not().isEmpty(),
    check("Peso", "El campo  peso es obligatorio").not().isEmpty(),
    check("Historia", "El campo historia es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  createCharacter
);

module.exports = {
  characters: router,
};
