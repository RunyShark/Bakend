const { Router } = require("express");
const { check } = require("express-validator");
const { createGender, getGender } = require("../controllers/genderController");
const { validarCampos } = require("../middlewares/validarCampos");
const { genderExist } = require("../helpers/dbValidators");
const { checkAuth } = require("../middlewares/checkJWT");
const router = Router();

router.get("/", getGender);
router.post(
  "/",
  [
    checkAuth,
    check("nombre").custom(genderExist),
    check("nombre", "El campo nombre es obligarotio").not().isEmpty(),
    check("imagen", "El campo imagen es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createGender
);
module.exports = {
  gender: router,
};
