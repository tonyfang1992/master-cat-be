"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      amount: DataTypes.INTEGER,
      sn: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
      paid_at: DataTypes.DATE,
      params: DataTypes.TEXT,
      OrderId: DataTypes.INTEGER,
    },
    {}
  );
  payment.associate = function (models) {
    // associations can be defined here
    Payment.belongsTo(models.Order);
  };
  return payment;
};
