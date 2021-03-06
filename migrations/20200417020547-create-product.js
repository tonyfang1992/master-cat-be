"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      SaleAmount: {
        type: Sequelize.INTEGER,
      },
      specification: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      detail: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      launched: {
        type: Sequelize.BOOLEAN,
      },
      ThisWeekActivityId: {
        type: Sequelize.INTEGER,
      },
      NewActivityId: {
        type: Sequelize.INTEGER,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
      },
      SubcategoryId: {
        type: Sequelize.INTEGER,
      },
      CanId: {
        type: Sequelize.INTEGER,
      },
      CanTypeId: {
        type: Sequelize.INTEGER,
      },
      FeedId: {
        type: Sequelize.INTEGER,
      },
      FeedAgeId: {
        type: Sequelize.INTEGER,
      },
      FeedFunctionId: {
        type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  },
};
