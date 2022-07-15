const { request, response } = require("express");
const { User } = require("../db/db");
//const { welcomeEmailRegister } = require("../helpers/sendEmails");

const register = async (req = request, res = response) => {
  const { nombre, edad, password, email, img } = req.body;
  try {
    const createUser = await User.create({
      nombre,
      edad,
      password,
      email,
      img,
    });
    res.json({ msg: "ok", createUser });
  } catch (error) {
    console.log(error);
  }

  // welcomeEmailRegister({
  //   email: [{ email }],
  //   name: "Dario",
  // });
};

const login = (req = request, res = response) => {
  const { email } = req.body;
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
