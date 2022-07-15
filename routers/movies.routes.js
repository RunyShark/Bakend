const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  titleExist,
  qualification,
  movieById,
  updateTitle,
  movieNotExists,
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
    check("id").custom(movieById),
    check("titulo").custom(updateTitle),
    validarCampos,
  ],
  editMovie
);
router.delete(
  "/",
  check("titulo", "El campo titulo, es obligatorio para borrar una pelicula")
    .not()
    .isEmpty(),
  check("titulo").custom(movieNotExists),
  deleteMovie
);
router.post(
  "/",
  [
    //checkAuth,
    check("Imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("titulo", "El campo  titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(titleExist),
    check("calificación", "El campo  peso es obligatorio").not().isEmpty(),
    check("calificación").custom(qualification),
    check("Historia", "El campo historia es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createMovie
);

module.exports = {
  movies: router,
};
