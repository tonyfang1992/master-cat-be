"use strict";
module.exports = (sequelize, DataTypes) => {
  const CanType = sequelize.define(
    "CanType",
    {
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  CanType.associate = function (models) {
    // associations can be defined here
    CanType.hasMany(models.Product);
  };
  return CanType;
};
