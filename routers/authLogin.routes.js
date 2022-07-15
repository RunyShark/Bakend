const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validarCampos");
const { mailRegister, mailExists } = require("../helpers/dbValidators");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Debe de ser un correo valido").isEmail(),
    check("email", "El correo es un campo obligatorio").not().isEmpty(),
    check("email").custom(mailRegister),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  register
);
router.get(
  "/login",
  [
    check("email", "Debe de ser un correo valido").isEmail(),
    check("email", "El correo es un campo obligatorio").not().isEmpty(),
    check("email").custom(mailExists),
    check("password", "La contraseña es un campo obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
module.exports = {
  auth: router,
};
