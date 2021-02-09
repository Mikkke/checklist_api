const { List, Task } = require("../models");
const { v4: uuidv4 } = require("uuid");

const list = {
  async createList({ body, decoded }, res, next) {
    try {
      const { name } = body;
      const { userId } = decoded;

      const list = await List.create({ id: uuidv4(), name, userId });
      return res.status(201).json({ list });
    } catch (error) {
      console.log("error :>> ", error);
      /* return next(new Error(error)); */
    }
  },
  async fetchAll({ decoded }, res, next) {
    try {
      const myLists = await List.findAll({
        where: { userId: decoded.userId },
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      });
      res.status(200).json(myLists);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async fetchOne({ params, decoded }, res, next) {
    console.log("params :>> ", params);
    console.log("params.listId :>> ", params.listId);
    console.log("decoded :>> ", decoded);
    try {
      const myList = await List.findOne({
        where: { id: params.listId, userId: decoded.userId },
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      });
      if (!myList) {
        return res.status(400).json({ error: "list not found" });
      }
      return res.status(200).json(myList);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async updateList({ body, params, decoded }, res, next) {
    try {
      const list = await List.findOne({
        where: { id: params.listId, userId: decoded.userId },
      });
      if (!list) {
        return res.status(400).json({ error: "wrong list id" });
      }
      const updatedList = await List.update(
        { name: body.name || list.name },
        {
          where: { id: list.id },
          returning: true,
          plain: true,
        }
      );
      return res.status(200).json(updatedList[1]);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async deleteList({ params, decoded }, res, next) {
    try {
      const list = await List.findOne({
        where: { id: params.listId, userId: decoded.userId },
      });
      if (!list) {
        return res.status(400).json({ error: "wrong list id" });
      }
      await list.destroy();
      return res.status(200).json({});
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = list;
