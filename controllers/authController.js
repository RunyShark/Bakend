const { request, response } = require("express");

const register = (req = request, res = response) => {
  //*11. Envío de emails
  //*Al registrarse en el sitio, el usuario deberá recibir un email de bienvenida. Es recomendable, la
  //*utilización de algún servicio de terceros como SendGrid.
  res.send("Register");
};
const login = (req = request, res = response) => {
  //*2. Autenticación de Usuarios
  //*Para realizar peticiones a los endpoints subsiguientes el usuario deberá contar con un token que
  //*obtendrá al autenticarse. Para ello, deberán desarrollarse los endpoints de registro y login, que
  //*permitan obtener el token.
  res.send("login");
};

module.exports = {
  login,
  register,
};
