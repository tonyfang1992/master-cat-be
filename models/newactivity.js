'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewActivity = sequelize.define('NewActivity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  NewActivity.associate = function(models) {
    // associations can be defined here
  };
  return NewActivity;
};