const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Personaje",
    {
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      historia: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
