const { Op } = require("sequelize");
const { request, response } = require("express");
const { Personaje, Pelicula } = require("../db/db");

const characterListOrSearch = async (req = request, res = response) => {
  try {
    const active = Object.keys(req.query).join(" ");
    const termino = Object.values(req.query).join(" ");

    switch (!!active ? active : "list") {
      case "name":
        characterByName(termino, res);
        break;
      case "age":
        characterByAge(termino, res);
        break;
      case "movies":
        characterByIdMovie(termino, res);
        break;
      case "list":
        charaterList(res);
        break;
      default:
        res.status(500).json({ Error: true, msg: "Olvide colocar esta ruta" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const charaterList = async (res = response) => {
  try {
    const getCharacter = await Personaje.findAll({
      attributes: ["nombre", "imagen"],
    });
    if (!getCharacter) {
      const error = new Error("No hay personajes almacenados en la DB");
      return res.status(404).json({ Error: true, msg: error.message });
    }
    res.json({
      msg: "ok",
      results: getCharacter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const characterByName = async (nombre = "", res = response) => {
  try {
    const character = await Personaje.findAll({
      where: {
        nombre: {
          [Op.iLike]: "%" + nombre + "%",
        },
      },
    });

    if (character.length === 0) {
      const error = new Error(
        `no se encontro ninguna conincidencia con el nombre ${nombre}`
      );
      return res.status(400).json({ Error: true, msg: error.message });
    }
    res.json({ msg: "ok", character: character });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const characterByIdDetails = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const detailsById = await Personaje.findByPk(id, {
      include: [
        {
          model: Pelicula,
        },
      ],
    });
    res.json({ msg: "ok", byId: detailsById });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const characterByAge = async (edad, res) => {
  try {
    const character = await Personaje.findAll({
      where: {
        edad,
      },
    });
    if (character.length === 0) {
      const error = new Error(
        `No existe ningun personaje con la edad: ${edad}`
      );
      return res.status(400).json({ Error: true, msg: error.message });
    }
    res.json({ msg: "ok", age: character });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const characterByIdMovie = async (idMovie, res = response) => {
  const movieByIdCharacter = await Personaje.findByPk(idMovie, {
    attributes: ["nombre", "historia"],
    include: [
      {
        model: Pelicula,
        attributes: ["titulo", "fechaDeCreacion", "calificacion"],
      },
    ],
  });
  if (!movieByIdCharacter) {
    const error = new Error(
      `No esta asociado a la pelicula con el id: ${idMovie}`
    );
    return res.status(400).json({ msg: error.message });
  }
  res.json({ msg: "ok", idMovie: movieByIdCharacter });
};

const createCharacter = async (req = request, res = response) => {
  try {
    const { nombre, imagen, peso, historia, edad, titulo } = req.body;

    const addCharacter = await Personaje.create({
      nombre,
      imagen,
      peso,
      historia,
      edad,
    });

    Array.isArray(titulo)
      ? titulo.map((title) => addCharacter.addPelicula(title))
      : await addCharacter.addPelicula(titulo);

    res.json({
      msg: "ok, para ver las categorias agradas, ir a detalles del personaje",
      movie: null,
      new: addCharacter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const editCharacter = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { nombre, imagen, peso, historia, edad } = req.body;
    const putCharacter = await Personaje.findByPk(id);
    putCharacter.nombre = nombre || putCharacter.nombre;
    putCharacter.imagen = imagen || putCharacter.imagen;
    putCharacter.peso = peso || putCharacter.peso;
    putCharacter.historia = historia || putCharacter.historia;
    putCharacter.edad = edad || putCharacter.edad;
    await putCharacter.save();

    res.status(203).json({ msg: "ok", UpdateCharacter: putCharacter });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const deleteCharacter = async (req = request, res = response) => {
  try {
    const { nombre } = req.body;
    const deleteCharacter = await Personaje.destroy({
      where: {
        nombre,
      },
    });

    res.status(203).json({
      msg: "ok",
      delete: {
        deleteCharacter,
        nombre,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

module.exports = {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
  characterByIdDetails,
};
