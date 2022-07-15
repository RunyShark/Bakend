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
        unique: true,
      },
      fechaDeCreacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Calificación: {
        type: DataTypes.DECIMAL,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 5,
        },
      },
      Personajes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
