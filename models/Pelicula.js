const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pelicula",
    {
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaDeCreacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Calificación: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Personajes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
