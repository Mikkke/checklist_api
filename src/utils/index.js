require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = /* jwtToken = */ {
  createToken: ({ id, email }) => {
    return jwt.sign({ userId: id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },
  hashPassword: (password) => {
    return bcrypt.hash(password, 10);
  },
  comparePassword: (password, hash) => {
    return bcrypt.compare(password, hash);
  },
};
