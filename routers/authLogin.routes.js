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
    check(
      "password",
      "La contraseña  debe  de tener mas de 5 caracteres"
    ).isLength({ min: 5 }),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/register",
  [
    check("nombre").custom(nameIsString),
    check("nombre", "El nombre debe tener mas de 2 letras").isLength({
      min: 3,
    }),
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("email", "Debe de ser un correo valido").isEmail(),
    check("email", "El correo es un campo obligatorio").not().isEmpty(),
    check("email").custom(mailRegister),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña  debe  de tener mas de 5 caracteres"
    ).isLength({ min: 5 }),
    validarCampos,
  ],
  register
);
module.exports = {
  auth: router,
};
