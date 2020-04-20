"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      SaleAmount: DataTypes.INTEGER,
      specification: DataTypes.STRING,
      price: DataTypes.INTEGER,
      detail: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      NewActivityId: DataTypes.INTEGER,
      ThisWeekActivityId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      SubcategoryId: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};
