"use strict";
module.exports = (sequelize, DataTypes) => {
  const FeedFunction = sequelize.define(
    "FeedFunction",
    {
      function: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  FeedFunction.associate = function (models) {
    // associations can be defined here
    FeedFunction.hasMany(models.Product);
  };
  return FeedFunction;
};
