const { Genero, Pelicula, Personaje, User } = require("../db/db");

const mailRegister = async (email = "") => {
  try {
    const mail = await User.findOne({
      where: {
        email,
      },
    });

    if (mail) {
      throw new Error(
        `El correo ${email} ya esta registrado, intente con otro correo`
      );
    }
  } catch (error) {
    console.log(`Error dbV mr ${error}`);
  }
};

const mailExists = async (email = "") => {
  try {
    const mail = await User.findOne({
      where: {
        email,
      },
    });

    if (!mail) {
      throw new Error(`El correo ${email} No existe`);
    }

    return true;
  } catch (error) {
    console.log(`Error dbV ms ${error}`);
  }
};

const genderExist = async (nombre = "") => {
  const genderExist = await Genero.findOne({
    where: {
      nombre,
    },
  });

  if (genderExist) {
    throw new Error(`El genero con el nombre: ${gender} ya existe.`);
  }
};
const titleExist = async (titulo = "") => {
  const movie = await Pelicula.findOne({
    where: {
      titulo,
    },
  });
  if (movie) {
    throw new Error(`La pelicula con el titulo: ${movie} ya existe.`);
  }
};

const qualification = async (calif = null) => {
  if (calif < 1 || calif > 6) {
    throw new Error(
      `La cafinicacion tiene un numero maximo 5 y no puede ser menor que 1 ${calif} es un numero que no entra en el rango`
    );
  }
};

const characterExist = async (nombre = "") => {
  const character = await Personaje.findOne({
    where: {
      nombre,
    },
  });

  if (character) {
    throw new Error(`El persona con el nombre ${nombre} ya existe.`);
  }
};

module.exports = {
  mailExists,
  mailRegister,
  genderExist,
  titleExist,
  qualification,
  characterExist,
};
