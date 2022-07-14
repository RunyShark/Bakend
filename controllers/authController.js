const { request, response } = require("express");

const register = (req = request, res = response) => {
  //*11. Envío de emails
  //*Al registrarse en el sitio, el usuario deberá recibir un email de bienvenida. Es recomendable, la
  //*utilización de algún servicio de terceros como SendGrid.
  res.send("Register");
};
const login = (req = request, res = response) => {
  res.send("login");
};

module.exports = {
  login,
  register,
};
