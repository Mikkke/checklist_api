const { User } = require("../models");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
  authMiddleware: async (req, res, next) => {
    const { name, email, password } = req.body;
    if (email == null || name == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }
    if (name.length >= 13 || name.length <= 2) {
      return res.status(400).json({ error: "wrong name must be 3 - 12" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "email not valid" });
    }
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error:
          "password not valid must be must length  4-8 include 1 number at least",
      });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ error: "User already exist" });
    }
    next();
  },
};
