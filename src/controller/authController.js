const models = require("../models");
const utils = require("../utils/index");
const { v4: uuidv4 } = require("uuid");

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = await utils.hashPassword(password);
      const user = await models.User.create({
        id: uuidv4(),
        name,
        email,
        password: hash,
      });
      const token = utils.createToken(user);
      const { id } = user;
      return res.status(201).json({ token, user: { id, name, email } });
    } catch (error) {
      return next(new Error(error));
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({ where: { email } });

      if (user && utils.comparePassword(password, user.password)) {
        const { id, name } = user;
        const token = utils.createToken(user);
        return res.status(200).json({ token, user: { id, name, email } });
      }
      return res
        .status(400)
        .json({ error: "invalid email password combination " });
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = auth;
