const { Router } = require("express");
const { check } = require("express-validator");
const { prueva } = require("../controllers/genderController");
const { validarCampos } = require("../middlewares/validarCampos");
const { genderExist } = require("../helpers/dbValidators");
const { checkAuth } = require("../middlewares/checkJWT");
const router = Router();

router.post(
  "/",
  [
    //checkAuth,
    check("nombre", "Debe de ser un correo valido").not().isEmpty(),
    check("imagen", "El correo es un campo obligatorio").not().isEmpty(),
    check("nombre").custom(genderExist),
    validarCampos,
  ],
  prueva
);
module.exports = {
  auth: router,
};
