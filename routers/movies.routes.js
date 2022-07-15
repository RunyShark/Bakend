const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { titleExist, qualification } = require("../helpers/dbValidators");
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
router.put("/", editMovie);
router.delete("/", deleteMovie);
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
