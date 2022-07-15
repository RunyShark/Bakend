const { request, response } = require("express");
const { User } = require("../db/db");
const { checkPassword, hassPassword } = require("../helpers/hasPassword");
//const { welcomeEmailRegister } = require("../helpers/sendEmails");

const register = async (req = request, res = response) => {
  const { nombre, edad, password, email, img } = req.body;
  try {
    const hashPass = await hassPassword(password);
    const createUser = await User.create({
      nombre,
      edad,
      password: hashPass,
      email,
      img,
    });

    await createUser.save();

    res.json({ msg: "ok", createUser });
  } catch (error) {
    console.log(error);
  }

  //? welcomeEmailRegister({ ----------------------------- antes de entregar descomentar OjO
  //   email: [{ email }],
  //   name: nombre,
  // });
};

const login = (req = request, res = response) => {
  const { email, password } = req.body;

  res.send("login");
};

module.exports = {
  login,
  register,
};
