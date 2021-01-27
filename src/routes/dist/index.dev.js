"use strict";

var mainRouter = require("express").Router(); // const mainRouter = express.Router();


mainRouter.get("/", function (req, res) {
  res.status(200).json({
    message: "salut"
  });
});
module.exports = mainRouter;