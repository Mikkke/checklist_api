"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        /* autoIncrement: true, */
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      statut: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      priority: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
