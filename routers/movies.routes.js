const { Router } = require("express");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  createMovie,
  deleteMovie,
  editMovie,
  getMovies,
} = require("../controllers/moviesController");
const { titleExiste } = require("../helpers/dbValidators");

const router = Router();

router.get("/", getMovies);
router.put("/", editMovie);
router.delete("/", deleteMovie);
router.post(
  "/",
  [
    check("Imagen", "El campo imagen es obligatorio").not().isEmpty(),
    check("titulo", "El campo  titulo es obligatorio").not().isEmpty(),
    check("titulo").custom(titleExiste),
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
