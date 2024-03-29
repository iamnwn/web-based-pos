const bcrypt = require("bcrypt");

const passwordHash = async (req, res, next) => {
  req.body.passwordHash = await bcrypt.hash(req.body.password, 10);
  delete req.body.password;

  next();
};

module.exports = passwordHash;
