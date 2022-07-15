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
        type: DataTypes.DATE,
        defaultValue: new Date().getTime(),
      },
      calificacion: {
        type: DataTypes.DECIMAL,
        defaultValue: 1,
        validate: {
          min: 1,
          max: 5,
        },
      },
      personajes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
