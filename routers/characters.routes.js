const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  characterExist,
  updateName,
  characterById,
  charaterNotExists,
  titleIsString,
  isNumber,
  nameIsString,
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

router.get("/", [checkAuth], characterListOrSearch);
router.get(
  "/:id",
  [checkAuth, check("id").custom(characterById), validarCampos],
  characterByIdDetails
);
router.put(
  "/:id",
  [
    checkAuth,
    check("id", "Para editar un personaje debes de mandar un Id")
      .not()
      .isEmpty(),
    check("id").custom(characterById),
    check("nombre").custom(updateName),
    check("nombre", "Debe de mandar el nombre del personaje que dea editar")
      .not()
      .isEmpty(),
    check("edad").custom(isNumber),
    check("peso").custom(isNumber),
    check("nombre").custom(nameIsString),

    validarCampos,
  ],
  editCharacter
);
router.delete(
  "/",
  [
    checkAuth,
    check(
      "nombre",
      "El campo  nombre, es obligatorio para poder elimitar un personaje"
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
    checkAuth,
    check("imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("nombre", "El campo  nombre es obligatorio").not().isEmpty(),
    check("edad", "El campo  edad es obligatorio").not().isEmpty(),
    check("peso", "El campo  peso es obligatorio").not().isEmpty(),
    check(
      "titulo",
      "El campo titulo es obligatorio, tiene que ser un id de una pelicula valida"
    )
      .not()
      .isEmpty(),
    check("historia", "El campo historia es obligatorio").not().isEmpty(),
    check("nombre").custom(nameIsString),
    check("edad").custom(isNumber),
    check("peso").custom(isNumber),
    check("titulo").custom(titleIsString),
    check("nombre").custom(characterExist),
    validarCampos,
  ],

  createCharacter
);

module.exports = {
  characters: router,
};
