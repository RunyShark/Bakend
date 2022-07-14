const { request, response } = require("express");

const characterListOrSearch = (req = request, res = response) => {
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
  res.send("listCharacters");
};

const createCharacter = (req = request, res = response) => {
  //*1. Creación
  //*Deberán existir las operaciones básicas de creación, edición y eliminación de personajes.
  res.send("createCharacter");
};

const editCharacter = (req = request, res = response) => {
  //*Edición
  res.send("EditCharacter");
};
const deleteCharacter = (req = request, res = response) => {
  //*Eliminación
  res.send("deleteCharacter");
};

module.exports = {
  characterListOrSearch,
  createCharacter,
  deleteCharacter,
  editCharacter,
};
