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
        type: DataTypes.BIGINT,
        defaultValue: 1,
      },
    },
    { timestamps: false }
  );
};
