"use strict";
module.exports = (sequelize, DataTypes) => {
  const Feed = sequelize.define(
    "Feed",
    {
      brand: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  Feed.associate = function (models) {
    // associations can be defined here
    Feed.hasMany(models.Product);
  };
  return Feed;
};
