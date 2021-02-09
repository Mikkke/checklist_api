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
      Task.belongsTo(models.List, {
        as: "task",
        foreignKey: "idLISTS",
      });
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      statut: DataTypes.BOOLEAN,
      priority: DataTypes.STRING,
      idLISTS: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
