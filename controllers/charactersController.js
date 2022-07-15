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
        res.status(500).json({ Error: true, msg: "Olvide colocar esta ruta" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const charaterList = async (res = response) => {
  try {
    //*○ Películas o series asociadas. fata ojo
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
    res.json({ msg: "ok", age: character });
  } catch (error) {
    console.log(error);
    res.status(500).json(`Algo salio mal Error: ${error.message}`);
  }
};

const characterByIdd = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    //*como así también sus películas o
    //*series relacionadas.
    const detailsById = await Personaje.findByPk(id);
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
  try {
    const { nombre, imagen, peso, historia, edad } = req.body;

    const addCharacter = await Personaje.create({
      nombre,
      imagen,
      peso,
      historia,
      edad,
    });

    res.json({ msg: "ok", addCharacter });
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
  characterByIdd,
};
