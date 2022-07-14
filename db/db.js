const { Sequelize } = require("sequelize");
require("colors");
const modelUser = require("../models/User");
const modelCharacter = require("../models/Personaje");
const modelMovie = require("../models/Pelicula");
const modelGender = require("../models/Genero");
const { USE_DB, PASSWORD_DB, PORT_DB, NAME_DB, HOST_DB } = process.env;

const sequelize = new Sequelize(
  `postgres://${USE_DB}:${PASSWORD_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`,
  {
    define: {
      freezeTableName: true,
    },
    logging: false,
    native: false,
  }
);

const name = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos en linea".brightCyan);
  } catch (error) {
    console.error(`${"Unable to connect to the database".red}:${error}`);
  }
};
name();

modelUser(sequelize);
modelCharacter(sequelize);
modelMovie(sequelize);
modelGender(sequelize);

const { Genero, Pelicula, Personaje, User } = sequelize.models;

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
