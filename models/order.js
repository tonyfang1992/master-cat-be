'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sn: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    shipping_status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};