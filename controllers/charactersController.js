const { request, response } = require("express");
const { Personaje } = require("../db/db");

const characterListOrSearch = async (req = request, res = response) => {
  // const { name, age, movies } = req.query;
  // if (name || age || movies) {
  //   switch (req.query) {
  //     case "name":
  //       createCharacter(query);
  //       break;
  //     case "age":
  //       createCharacter(query);
  //       break;
  //     case "movies":
  //       createCharacter(query);
  //       break;
  //     default:
  //       res.status(500).json({ msg: "Olvide colocar esta ruta" });
  //   }
  // }

  const getCharacter = await Personaje.findAll();
  res.json({
    msg: "ok",
    results: getCharacter,
  });

  //*. Listado de Personajes
  //**El listado deberá mostrar:
  //*● Imagen.
  //*● Nombre.
  //*name,age,movie

  //*2. Detalle de Personaje
  //*En el detalle deberán listarse todos los atributos del personaje, como así también sus películas o
  //*series relacionadas.
  //*6. Búsqueda de Personajes
  //*Deberá permitir buscar por nombre, y filtrar por edad, peso o películas/series en las que participó.
  //*Para especificar el término de búsqueda o filtros se deberán enviar como parámetros de query:

  //*● GET /characters?name=nombre
  //*● GET /characters?age=edad
  //*● GET /characters?movies=idMovie
};

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
};
