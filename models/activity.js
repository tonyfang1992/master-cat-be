'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
  };
  return Activity;
};