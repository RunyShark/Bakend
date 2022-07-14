const { Router } = require("express");
const { prueva } = require("../controllers/authController");

//*. Listado de Personajes
//**El listado deberá mostrar:
//*● Imagen.
//*● Nombre.
//*El endpoint deberá ser:
//*● /characters

//*1. Creación, Edición y Eliminación de Personajes (CRUD)
//*Deberán existir las operaciones básicas de creación, edición y eliminación de personajes.

//*2. Detalle de Personaje
//*En el detalle deberán listarse todos los atributos del personaje, como así también sus películas o
//*series relacionadas.

//*6. Búsqueda de Personajes
//*Deberá permitir buscar por nombre, y filtrar por edad, peso o películas/series en las que participó.
//*Para especificar el término de búsqueda o filtros se deberán enviar como parámetros de query:

//*● GET /characters?name=nombre
//*● GET /characters?age=edad
//*● GET /characters?movies=idMovie
const router = Router();

router.get("/", prueva);

module.exports = {
  characters: router,
};
