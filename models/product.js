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
      launched: DataTypes.BOOLEAN,
      discount: DataTypes.INTEGER,
      NewActivityId: DataTypes.INTEGER,
      ThisWeekActivityId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      SubcategoryId: DataTypes.INTEGER,
      CanId: DataTypes.INTEGER,
      FeedId: DataTypes.INTEGER,
    },
    {}
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsToMany(models.Cart, {
      as: "carts",
      through: {
        model: models.CartItem,
        unique: false,
      },
      foreignKey: "ProductId",
    });
    Product.belongsToMany(models.Order, {
      as: "orders",
      through: {
        model: models.OrderItem,
        unique: false,
      },
      foreignKey: "ProductId",
    });
  };
  return Product;
};
