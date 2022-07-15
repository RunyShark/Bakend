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

//const genero = async (email = "") => {};

module.exports = {
  mailExists,
  mailRegister,
};
