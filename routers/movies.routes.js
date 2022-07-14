const { Router } = require("express");
const {
  createMovie,
  deleteMovie,
  detailsMovie,
  editMovie,
  getMovies,
} = require("../controllers/moviesController");

const router = Router();

router.get("/", getMovies);
router.put("/", editMovie);
router.delete("/", deleteMovie);
router.post("/", createMovie);

module.exports = {
  movies: router,
};
