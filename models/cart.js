"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      name: DataTypes.INTEGER,
    },
    {}
  );
  Cart.associate = function (models) {
    // associations can be defined here
  };
  return Cart;
};
