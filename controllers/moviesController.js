const { Op } = require("sequelize");
const { request, response } = require("express");
const { Pelicula, Personaje, Genero } = require("../db/db");

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
};
const movieByList = async (res = response) => {
  try {
    const movieListe = await Pelicula.findAll({
      attributes: ["imagen", "titulo", "fechaDeCreacion"],
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
const movieByName = async (titulo = "", res = response) => {
  try {
    const moviebyTitle = await Pelicula.findAll({
      where: {
        titulo: {
          [Op.iLike]: "%" + titulo + "%",
        },
      },
    });

    if (moviebyTitle.length === 0) {
      const error = new Error(
        `no se encontro ninguna conincidencia con el titulo ${titulo}`
      );
      return res.status(400).json({ Error: true, msg: error.message });
    }
    res.json({ msg: "ok", title: moviebyTitle });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const movieByGenre = async (idGender, res = response) => {
  const movieForGender = await Pelicula.findByPk(idGender, {
    attributes: ["titulo"],
    include: [
      {
        model: Genero,
        attributes: ["nombre"],
      },
    ],
  });

  if (!movieForGender || movieForGender.length === 0) {
    console.log("Holaaaa");
    const error = new Error(`No se encontro ninguna pelicula con ese id`);
    return res.status(400).json({ Error: true, msg: error.message });
  }
  res.json({ msg: "ok", movieForGender });
};

const movieByASCOrDESC = async (organize, res = response) => {
  try {
    const active = organize.toUpperCase();

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
    const { id } = req.params;
    const movieById = await Pelicula.findByPk(id, {
      include: [
        {
          model: Personaje,
        },
      ],
    });
    res.json({ msg: "ok", byId: movieById });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const createMovie = async (req = request, res = response) => {
  try {
    const { imagen, titulo, calificacion, fechaDeCreacion, genero } = req.body;

    const createMovie = await Pelicula.create({
      imagen,
      titulo,
      calificacion,
      fechaDeCreacion,
    });

    await createMovie.addGenero(genero);

    const movieAddNewe = await Pelicula.findOne({
      where: {
        titulo,
      },
      include: [
        {
          model: Genero,
        },
      ],
    });

    res.json({ msg: "ok", newMovie: createMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const editMovie = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { imagen, titulo, fechaDeCreacion, calificacion } = req.body;
    console.log(titulo);
    const putMovie = await Pelicula.findByPk(id);
    putMovie.titulo = titulo || putMovie.titulo;
    putMovie.imagen = imagen || putMovie.imagen;
    putMovie.fechaDeCreacion = fechaDeCreacion || putMovie.fechaDeCreacion;
    putMovie.calificacion = calificacion || putMovie.calificacion;
    await putMovie.save();

    res.status(203).json({ msg: "ok", UpdateMovie: putMovie });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const deleteMovie = async (req = request, res = response) => {
  try {
    const { titulo } = req.body;
    const deletMovie = await Pelicula.destroy({
      where: {
        titulo,
      },
    });

    res.status(203).json({
      msg: "ok",
      delte: {
        deletMovie,
        titulo,
      },
    });
  } catch (error) {
    console.log("hola");
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  editMovie,
  moviesListOrSearch,
  movieByIdDetallils,
};
