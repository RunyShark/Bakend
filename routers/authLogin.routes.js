const { Router } = require("express");
const { login, register } = require("../controllers/authController");
//*2. Autenticación de Usuarios
//*Para realizar peticiones a los endpoints subsiguientes el usuario deberá contar con un token que
//*obtendrá al autenticarse. Para ello, deberán desarrollarse los endpoints de registro y login, que
//*permitan obtener el token.
//*Los endpoints encargados de la autenticación deberán ser:
const router = Router();

router.post("/register", register);
router.get("/login", login);
module.exports = {
  auth: router,
};
