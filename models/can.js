"use strict";
module.exports = (sequelize, DataTypes) => {
  const Can = sequelize.define(
    "Can",
    {
      brand: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  Can.associate = function (models) {
    // associations can be defined here
    Can.hasMany(models.Product);
  };
  return Can;
};
