'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    breed: DataTypes.STRING
  }, {});
  Cat.associate = function(models) {
    // associations can be defined here
  };
  return Cat;
};