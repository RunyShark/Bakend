const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validarCampos");
const { genderExist } = require("../helpers/dbValidators");
const router = Router();

router.post(
  "/",
  [
    check("nombre", "Debe de ser un correo valido").not().isEmpty(),
    check("imagen", "El correo es un campo obligatorio").not().isEmpty(),
    check("nombre").custom(genderExist),
    validarCampos,
  ],
  register
);
module.exports = {
  auth: router,
};
