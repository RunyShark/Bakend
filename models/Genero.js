const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Genero",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
