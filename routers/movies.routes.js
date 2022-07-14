const { Router } = require("express");
const { prueva } = require("../controllers/authController");
//*1. Listado de Películas
//*Deberá mostrar solamente los campos imagen, título y fecha de creación.
//**El endpoint deberá ser:
//*● GET /movies */

//*2. Detalle de Película / Serie con sus personajes
//*Devolverá todos los campos de la película o serie junto a los personajes asociados a la misma
//*3. Creación, Edición y Eliminación de Película / Serie
//*Deberán existir las operaciones básicas de creación, edición y eliminación de películas o series.
//*4.Búsqueda de Películas o Series
//*Deberá permitir buscar por título, y filtrar por género. Además, permitir ordenar los resultados
//*por fecha de creación de forma ascendiente o descendiente.
//*El término de búsqueda, filtro u ordenación se deberán especificar como parámetros de query:
//*● GET /movies?name=nombre
//*● GET /movies?genre=idGenero
//*● GET /movies?order=ASC | DESC

//*11. Envío de emails
//*Al registrarse en el sitio, el usuario deberá recibir un email de bienvenida. Es recomendable, la
//*utilización de algún servicio de terceros como SendGrid.
const router = Router();

router.get("/", prueva);

module.exports = {
  movies: router,
};
