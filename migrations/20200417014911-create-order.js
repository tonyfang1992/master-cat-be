"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sn: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.STRING,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      shipping_status: {
        type: Sequelize.STRING,
      },
      UserId: {
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
    return queryInterface.dropTable("Orders");
  },
};
