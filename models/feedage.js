"use strict";
module.exports = (sequelize, DataTypes) => {
  const FeedAge = sequelize.define(
    "FeedAge",
    {
      age: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  FeedAge.associate = function (models) {
    // associations can be defined here
    FeedAge.hasMany(models.Product);
  };
  return FeedAge;
};
