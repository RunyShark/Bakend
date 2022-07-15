const { request, response } = require("express");
const { User } = require("../db/db");
const { checkPassword, hassPassword } = require("../helpers/hasPassword");
const { generarJWT } = require("../helpers/generarJWT");
//const { welcomeEmailRegister } = require("../helpers/sendEmails");

const register = async (req = request, res = response) => {
  const { nombre, edad, password, email, img, baneo } = req.body;
  try {
    const hashPass = await hassPassword(password);
    const createUser = await User.create({
      nombre,
      edad,
      password: hashPass,
      email,
      img,
      baneo,
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

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user.baneo) {
    const error = new Error(`El usuario ${user.nombre} esta baneado`);
    return res.status(400).json({ msg: error.message });
  }

  if (await checkPassword(password, user.password)) {
    const { nombre, img, edad } = user;
    res.json({
      msg: "Login ok",
      user: {
        nombre,
        img,
        edad,
        token: generarJWT(user),
      },
    });
  }
};

module.exports = {
  login,
  register,
};
