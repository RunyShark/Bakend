const { Op } = require("sequelize");
const { request, response } = require("express");
const { Pelicula } = require("../db/db");

const moviesListOrSearch = (req = request, res = response) => {
  try {
    const active = Object.keys(req.query).join(" ");
    const termino = Object.values(req.query).join(" ");

    switch (!!active ? active : "list") {
      case "name":
        movieByName(termino, res);
        break;
      case "genre":
        movieByGenre(termino, res);
        break;
      case "order":
        movieByASCOrDESC(termino, res);
        break;
      case "list":
        movieByList(res);
        break;
      default:
        res.status(500).json({ Error: true, msg: "Olvide colocar esta ruta" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }

  const { name } = req.query;

  res.json({ msg: "hola", query: name });
};
const movieByList = async (res = response) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};
const movieByName = async (title, res = response) => {
  //*Deberá permitir buscar por título,
  try {
    const moviebyTitle = await Pelicula.findOne({
      where: {
        title: {
          [Op.iLike]: "%" + title + "%",
        },
      },
    });
    if (moviebyTitle.length === 0) {
      const error = new Error(
        `no se encontro ninguna conincidencia con el titulo ${title}`
      );
      return res.status(400).json({ Error: true, msg: error.message });
    }
    res.json({ msg: "ok", title: title });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

// const movieByGenre = async (gender, res = response) => {
//   try {

//   } catch (error) {
//     console.log(error);
//     res.status(500).json(`Algo salio mal Error: ${error.message}`);
//   }
// };
const movieByASCOrDESC = async (organize, res = response) => {
  try {
    const active = organize.toLowerCase();
    if (active === "DESC") {
      const orderMovies = await Pelicula.findAll({
        order: [["titulo", "DESC"]],
      });
      if (orderMovies.length === 0) {
        const error = new Error(`no se encontro data`);
        return res.status(400).json({ Error: true, msg: error.message });
      }
      return res.json({ msg: "ok", DESC: orderMovies });
    } else {
      const orderMovies = await Pelicula.findAll({
        order: [["titulo", "ASC"]],
      });
      if (orderMovies.length === 0) {
        const error = new Error(`no se encontro data`);
        return res.status(400).json({ Error: true, msg: error.message });
      }
      return res.json({ msg: "ok", ASC: orderMovies });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const movieByIdDetallils = async (req = request, res = response) => {
  try {
    //*2. Detalle de Película / Serie con sus personajes
    //*Devolverá todos los campos de la película o serie junto a los personajes asociados a la misma
    const { id } = req.params;
    const movieById = await Pelicula.findByPk(id);
    res.json({ msg: "ok", byId: movieById });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const createMovie = (req = request, res = response) => {
  try {
    const { imagen, titulo, fechaDeCreacion, calificacion } = req.body;
    const createMovie = await Pelicula.create({
    imagen,
    titulo,
    fechaDeCreacion, 
    calificacion
    })
    res.json({ msg: "ok", createMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
  res.send("createMovie");
};

const editMovie = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { imagen, titulo, fechaDeCreacion, calificacion } = req.body;
    const putMovie = await Pelicula.findByPk(id);
    putMovie.titulo = titulo || putMovie.titulo;
    putMovie.imagen = imagen || putMovie.imagen;
    putMovie.fechaDeCreacion = fechaDeCreacion || putMovie.fechaDeCreacion;
    putMovie.calificacion = calificacion || putCharacter.calificacion;
    await putCharacter.save();
    res.status(203).json({ msg: "ok", UpdateMovie: putMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
  res.send("editMovie ");
};

const deleteMovie = (req = request, res = response) => {
  try {
    const { titulo } = req.body;
    const deleteMovie = await Pelicula.destroy({
      where: {
        titulo,
      },
    });

    res.status(203).json({
      msg: "ok",
      delete: {
        deleteMovie,
        nombre,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
  
  res.send("deleteMovie");
};

module.exports = {
  createMovie,
  deleteMovie,
  detailsMovie,
  editMovie,
  moviesListOrSearch,
  movieByIdDetallils,
};
