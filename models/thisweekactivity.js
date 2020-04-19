'use strict';
module.exports = (sequelize, DataTypes) => {
  const ThisWeekActivity = sequelize.define('ThisWeekActivity', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER
  }, {});
  ThisWeekActivity.associate = function(models) {
    // associations can be defined here
  };
  return ThisWeekActivity;
};