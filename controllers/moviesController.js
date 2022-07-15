const { request, response } = require("express");
const { Pelicula } = require("../db/db");

const moviesListOrSearch = (req = request, res = response) => {
  //*Deberá mostrar solamente los campos imagen, título y fecha de creación.
  //*4.Búsqueda de Películas o Series
  //*Deberá permitir buscar por título, y filtrar por género. Además, permitir ordenar los resultados
  //*por fecha de creación de forma ascendiente o descendiente.
  //*El término de búsqueda, filtro u ordenación se deberán especificar como parámetros de query:
  //*● GET /movies?name=nombre
  //*● GET /movies?genre=idGenero
  //*● GET /movies?order=ASC | DESC
  const { name } = req.query;

  res.json({ msg: "hola", query: name });
};
const movieByList = async (res = response) => {
  const movieListe = await Pelicula.findAll({
    attributes: ["imagen", "título", "fechaDeCreacion"],
  });

  if (!movieListe) {
    const error = new Error("No hay peliculas almacenadas en la DB");
    return res.status(400).json({ Error: true, msg: error.message });
  }

  res.json({
    msg: "ok",
    results: movieListe,
  });
};
const movieByName = async (w) => {};
const movieByGenre = async () => {};
const movieByASCOrDESC = () => {};

const detailsMovie = (req = request, res = response) => {
  //*2. Detalle de Película / Serie con sus personajes
  //*Devolverá todos los campos de la película o serie junto a los personajes asociados a la misma
};

const createMovie = (req = request, res = response) => {
  res.send("createMovie");
};

const editMovie = (req = request, res = response) => {
  res.send("editMovie ");
};

const deleteMovie = (req = request, res = response) => {
  //*3. Creación, Edición y Eliminación de Película / Serie
  //*Deberán existir las operaciones básicas de creación, edición y eliminación de películas o series.
  res.send("deleteMovie");
};

module.exports = {
  createMovie,
  deleteMovie,
  detailsMovie,
  editMovie,
  moviesListOrSearch,
};
