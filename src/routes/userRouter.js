const userRouter = require("express").Router();
const { addUser } = require("../controller/userController");
const { User } = require("../models");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  console.log("req.body :>> du routeur ", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      res.status(400).json({ message: "User already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await addUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      console.log("newUser :>> ", newUser);
      res.status(201).json({ message: "user created succesfully" });
    }
  } catch (error) {
    console.log("error from register :>> ", error);
  }
});
module.exports = userRouter;
