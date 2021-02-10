const { List, Task } = require("../models");
const { v4: uuidv4 } = require("uuid");

const todoItems = {
  async create(req, res, next) {
    try {
      const { name, listId } = req.body;
      const task = await Task.create({ id: uuidv4(), name, listId });
      return res.status(201).json(task);
    } catch (error) {
      return next(new Error(error));
    }
  },

  async fetchAll(req, res, next) {
    try {
      const { listId } = req.params;
      const tasks = await Task.findAll({
        where: { listId },
        include: [
          {
            model: List,
            as: "list",
          },
        ],
      });
      return res.status(200).json({ tasks });
    } catch (error) {
      return next(new Error(error));
    }
  },
  async fetchOne(req, res, next) {
    try {
      const { taskId } = req.params;
      const task = Task.findOne({
        where: { id: taskId },
        include: [
          {
            model: List,
            as: "list",
          },
        ],
      });
      return res.status(200).json({ task });
    } catch (error) {
      return next(new Error(error));
    }
  },
  async update(req, res, next) {
    try {
      const { name, statut } = req.body;
      const task = Task.findOne({
        where: { id: req.params.taskId },
      });
      if (!task) {
        return res.status(404).json({ error: "item does not exist" });
      }
      const updateTask = await Task.update(
        {
          name,
          statut,
        },
        {
          where: { id: req.params.taskId },
          returning: true,
          plain: true,
        }
      );
      return res.status(200).json({ updateTask });
    } catch (error) {
      return next(new Error(error));
    }
  },
  async delete(req, res, next) {
    try {
      const task = Task.findOne({
        where: { id: req.params.taskId },
      });
      if (!task) {
        return res.status(404).json({ error: "item does not exist" });
      }
      await task.destroy();
      return res.status(200).json({});
    } catch (error) {
      return next(new Error(error));
    }
  },
};

module.exports = todoItems;
