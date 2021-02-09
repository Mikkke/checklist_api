const mainRouter = require("express").Router();
const userRouter = require("./userRouter");

mainRouter.use("/user", userRouter);

module.exports = mainRouter;
