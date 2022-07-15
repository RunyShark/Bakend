const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  characterExist,
  updateName,
  characterById,
  charaterNotExists,
} = require("../helpers/dbValidators");
const { checkAuth } = require("../middlewares/checkJWT");
const {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
  characterByIdDetails,
} = require("../controllers/charactersController");

const router = Router();

router.get("/", characterListOrSearch);
router.get(
  "/:id",
  [check("id").custom(characterById), validarCampos],
  characterByIdDetails
);
router.put(
  "/:id",
  [
    check("id", "Para editar un personaje debes de mandar un Id")
      .not()
      .isEmpty(),
    check("id").custom(characterById),
    check("nombre").custom(updateName),
    check("nombre", "Debe de mandar el nombre del personaje que dea editar")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  editCharacter
);
router.delete(
  "/",
  [
    check(
      "nombre",
      "El campo  nombre es obligatorio para poder elimitar un personaje"
    )
      .not()
      .isEmpty(),
    check("nombre").custom(charaterNotExists),
    validarCampos,
  ],
  deleteCharacter
);
router.post(
  "/",
  [
    //checkAuth,
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
