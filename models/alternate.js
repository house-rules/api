'use strict';
module.exports = (sequelize, DataTypes) => {
  var Alternate = sequelize.define('Alternate', {
    gameId:       DataTypes.INTEGER,
    userId:       DataTypes.INTEGER,
    title:        DataTypes.STRING,
    objective:    DataTypes.STRING,
    rules:        DataTypes.STRING(5000)
  }, {});

  Alternate.associate = function(models) {
    Alternate.belongsTo(models.Game, {
      as: "Games",
      foreignKey: "gameId"
    })
    Alternate.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userId"
    })
    Alternate.hasMany(models.Like, {
      as: "Likes",
      foreignKey: "alternateId"
    })
  };

  return Alternate;
};
