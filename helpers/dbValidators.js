const { Genero, Pelicula, Personaje, User } = require("../db/db");

const mailRegister = async (email = "") => {
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
};

const mailExists = async (email = "") => {
  const mail = await User.findOne({
    where: {
      email,
    },
  });

  if (!mail) {
    throw new Error(`El correo ${email} No existe`);
  }

  return true;
};

const genderExist = async (nombre = "") => {
  const genderExist = await Genero.findOne({
    where: {
      nombre,
    },
  });

  if (genderExist) {
    throw new Error(`El genero con el nombre: ${nombre} ya existe.`);
  }
};
const titleExist = async (titulo = "") => {
  const movie = await Pelicula.findOne({
    where: {
      titulo,
    },
  });
  if (movie) {
    throw new Error(`La pelicula con el titulo: ${titulo} ya existe.`);
  }
};

const qualification = async (calif) => {
  console.log(calif);
  if (calif <= 0 || calif >= 6) {
    throw new Error(
      `La cafinicacion tiene que ser un numero maximo 5 y no puede ser menor que 1 ${calif} es un numero que no entra en el rango`
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

const userBaneo = async (baneo = false) => {
  if (baneo) throw new Error("Cuenta baneada");
};
const updateName = async (nombre = "") => {
  const character = await Personaje.findOne({
    where: {
      nombre,
    },
  });

  if (character) {
    throw new Error(
      `No se puedo editar el nombre. El persona con el nombre ${nombre} ya existe.`
    );
  }
};

const characterById = async (id) => {
  const byIdValid = await Personaje.findByPk(id);
  if (!byIdValid) {
    throw new Error(
      `El perosnaje con el id: ${id} no existe, intenta con un id existente.`
    );
  }
};

const charaterNotExists = async (nombre = "") => {
  const existCharacter = await Personaje.findOne({
    where: {
      nombre,
    },
  });
  if (!existCharacter) {
    throw new Error(`El personaje con el nombre: ${nombre} no existe.`);
  }
};

const movieById = async (id) => {
  const byIdMovie = await Pelicula.findByPk(id);
  if (!byIdMovie) {
    throw new Error(`La pelicula con el id: ${id} no existe.`);
  }
};
const updateTitle = async (titulo = "") => {
  const existsName = await Pelicula.findOne({
    where: {
      titulo,
    },
  });
  if (existsName) {
    throw new Error(
      `Ya existe una pelicula con el titulo: ${titulo}, no se pueden repetir titulos`
    );
  }
};
const movieNotExists = async (titulo = "") => {
  const existMovie = await Pelicula.findOne({
    where: {
      titulo,
    },
  });
  if (!existMovie) {
    throw new Error(
      `La pelicula con el titulo con el nombre: ${titulo} no existe.`
    );
  }
};

const titleIsString = async (titulo) => {
  if (typeof titulo === "string") {
    throw new Error(
      `Solo se aceptan numeros y arrays de numeros ${titulo} no es un numero ni un array de numeros`
    );
  }
};
const nameIsString = async (titulo) => {
  if (typeof titulo === "number") {
    throw new Error(`Solo se aceptan letras o strings como numeros ${titulo} `);
  }
};

const isNumber = (value) => {
  console.log(value);

  if (typeof value !== "number") {
    throw new Error(`Solo se aceptan numeros ${value} no es un numero`);
  }
  return true;
};

const nameLength = (name = "") => {
  console.log(name);
  if (name.length < 3) {
    throw new Error(
      `El nombre debe tener mas de 2 letras, ${name} no cumple con esta regla`
    );
  }
  return true;
};

const passwordLength = (password) => {
  if (password.length <= 5)
    throw new Error(
      `La contraseña  debe  de tener mas de 5 caracteres ${password} no cumple con la regla`
    );
  return true;
};

module.exports = {
  characterById,
  characterExist,
  charaterNotExists,
  genderExist,
  isNumber,
  mailExists,
  mailRegister,
  movieById,
  movieNotExists,
  nameIsString,
  qualification,
  titleExist,
  titleIsString,
  updateName,
  updateTitle,
  userBaneo,
  nameLength,
  passwordLength,
};
