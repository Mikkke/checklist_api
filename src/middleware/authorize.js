require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  authorizeMiddleware: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    //Bearer
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { expireIn: "1h" },
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ error });
        }
        req.decoded = decoded;
        User.findByPk(decoded.userId).then((user) => {
          if (!user) {
            res.status(401).json({ error: "User does not exist" });
          }
          next();
        });
      }
    );
  },
};
