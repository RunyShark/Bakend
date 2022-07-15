const { Op } = require("sequelize");
const { request, response } = require("express");
const { Personaje } = require("../db/db");

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
        console.log("Hola");
        charaterList(res);
        break;
      default:
        res.status(500).json({ msg: "Olvide colocar esta ruta" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const charaterList = async (res = response) => {
  //*○ Películas o series asociadas. fata ojo
  const getCharacter = await Personaje.findAll({
    attributes: ["nombre", "imagen"],
  });

  res.json({
    msg: "o000k",
    results: getCharacter,
  });
};

const characterByName = async (nombre = "", res = response) => {
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
    return res.status(400).json({ msg: error.message });
  }
  res.json({ msg: "ok", age: character });
};
const characterByIdd = async (req = request, res = response) => {
  const { id } = req.params;
  //*como así también sus películas o
  //*series relacionadas.
  const detailsById = await Personaje.findByPk(id);
  res.json({ msg: "ok", byId: detailsById });
};

const characterByAge = async (age, res) => {
  const character = await Personaje.findAll({
    where: {
      age,
    },
  });
  if (!character) {
    const error = new Error(`No existe ningun personaje con la edad: ${age}`);
    return res.status(400).json({ msg: error.message });
  }
  res.json({ msg: "ok", age: character });
};

// const characterByIdMovie = async (idMovie, res) => {
//   const idMovie = await Personaje.findAll({
//     where: {
//       idMovie,
//     },
//   });
//   if (!character) {
//     const error = new Error(
//       `No esta asociado a la pelicula con el id: ${idMovie}`
//     );
//     return res.status(400).json({ msg: error.message });
//   }
//   res.json({ msg: "ok", idMovie: character });
// };

const createCharacter = async (req = request, res = response) => {
  const { nombre, imagen, peso, historia, edad } = req.body;

  const addCharacter = await Personaje.create({
    nombre,
    imagen,
    peso,
    historia,
    edad,
  });

  res.json({ msg: "ok", addCharacter });
};

const editCharacter = async (req = request, res = response) => {
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
};

const deleteCharacter = async (req = request, res = response) => {
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
};

module.exports = {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
  characterByIdd,
};
