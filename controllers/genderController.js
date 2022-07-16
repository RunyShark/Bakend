const { request, response } = require("express");
const { Genero } = require("../db/db");

const getGender = async (req = request, res = response) => {
  const gender = await Genero.findAll();
  if (gender.length === 0) {
    const error = new Error("No hay generos guardados en la db");
    return res.status(404).json({ Error: true, msg: error.message });
  }
  res.json({ msg: "ok", results: gender });
};

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
  getGender,
};
