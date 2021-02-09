"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.List.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

      models.List.hasMany(models.Task, {
        as: "tasks",
        foreignKey: "listId",
      });
    }
    s;
  }
  List.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
