const bcrypt = require("bcrypt");

const hassPassword = async (password = "") => {
  const salt = await bcrypt.genSalt(10);
  const cryptPassword = (password = await bcrypt.hash(password, salt));
  return cryptPassword;
};

const checkPassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hassPassword,
  checkPassword,
};
