const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validator: {
          isEmail: true,
          notEmpty: true,
        },
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      baneo: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      confirmacionCuenta: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    { timestamps: false }
  );
};
