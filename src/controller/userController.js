const { User } = require("../models/");
const { v4: uuidv4 } = require("uuid");

const userController = {
  addUser: async (data) => {
    console.log("data :>> from the controller", data);
    const newUser = { id: uuidv4(), ...data };
    console.log("newUser from controller:>> ", newUser);
    const userCreate = await User.create(newUser);
    console.log("userCreate from controller:>> ", userCreate);
    return userCreate;
  },
};

module.exports = userController;
