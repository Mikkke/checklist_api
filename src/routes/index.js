const mainRouter = require("express").Router();
// const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.status(200).json({ message: "salut" });
});

module.exports = mainRouter;
