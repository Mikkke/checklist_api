"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.hasMany(models.Task, {
        foreignKey: "",
        as: "",
      });
      Task.belongsTo(models.User, {
        foreignKey: "",
      });
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      statut: DataTypes.BOOLEAN,
      priority: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
