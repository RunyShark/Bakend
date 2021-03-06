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
        type: DataTypes.DECIMAL,
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      registerSocial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rol: {
        type: DataTypes.STRING,
        equals: ["USER", "ADMIN"],
        defaultValue: "USER",
      },
    },
    { timestamps: false }
  );
};
