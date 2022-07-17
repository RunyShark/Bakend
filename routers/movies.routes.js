const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  titleExist,
  qualification,
  movieById,
  updateTitle,
  movieNotExists,
  nameIsString,
  isNumber,
} = require("../helpers/dbValidators");
const { checkAuth } = require("../middlewares/checkJWT");
const {
  createMovie,
  deleteMovie,
  editMovie,
  moviesListOrSearch,
  movieByIdDetallils,
} = require("../controllers/moviesController");

const router = Router();

router.get("/", moviesListOrSearch);
router.get(
  "/:id",
  [check("id").custom(movieById), validarCampos],
  movieByIdDetallils
);
router.put(
  "/:id",
  [
    checkAuth,
    check("id").custom(movieById),
    check("titulo").custom(updateTitle),
    check("titulo").custom(nameIsString),
    check("imagen").custom(nameIsString),
    check("calificacion").custom(qualification),

    validarCampos,
  ],
  editMovie
);
router.delete(
  "/",
  [
    checkAuth,
    check("titulo", "El campo titulo, es obligatorio para borrar una pelicula")
      .not()
      .isEmpty(),
    check("titulo").custom(movieNotExists),
    validarCampos,
  ],
  deleteMovie
);
router.post(
  "/",
  [
    checkAuth,
    check("genero", "Genero es un capo obligatorio").not().isEmpty(),
    check("genero").custom(isNumber),
    check("imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("imagen").custom(nameIsString),
    check("titulo", "El campo  titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(nameIsString),
    check("titulo").custom(titleExist),
    check("calificacion", "El campo calificacion obligatorio").not().isEmpty(),
    check("calificacion").custom(isNumber),
    check("calificacion").custom(qualification),
    validarCampos,
  ],
  createMovie
);

module.exports = {
  movies: router,
};
