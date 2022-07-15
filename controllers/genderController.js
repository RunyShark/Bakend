const { request, response } = require("express");
const { Genero } = require("../db/db");
const createGender = async (req = request, res = response) => {
  const { nombre, imagen } = req.body;
  const addGencer = await Genero.create({
    nombre,
    imagen,
  });
  res.json({ msg: "ok", genderAdd: addGencer });
};

module.exports = {
  createGender,
};
