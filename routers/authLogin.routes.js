const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  mailRegister,
  mailExists,
  userBaneo,
  nameIsString,
} = require("../helpers/dbValidators");
const router = Router();

router.post(
  "/login",
  [
    check("email", "Debe de ser un correo valido").isEmail(),
    check("email", "El correo es un campo obligatorio").not().isEmpty(),
    check("email").custom(mailExists),
    check("baneo").custom(userBaneo),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/register",
  [
    check("nombre").custom(nameIsString),
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("email", "Debe de ser un correo valido").isEmail(),
    check("email", "El correo es un campo obligatorio").not().isEmpty(),
    check("email").custom(mailRegister),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  register
);
module.exports = {
  auth: router,
};
