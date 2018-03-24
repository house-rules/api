'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    userId:            DataTypes.INTEGER,
    title:             DataTypes.STRING,
    category:          DataTypes.STRING,
    numberOfPlayers:   DataTypes.STRING,
    playerAgeRange:    DataTypes.STRING,
    objective:         DataTypes.STRING,
    productLink:       DataTypes.STRING,
    rules:             DataTypes.STRING(5000)
  }, {});

  Game.associate = function(models) {
    Game.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userId"
    })
    Game.hasMany(models.Alternate, {
      as: "Alternates",
      foreignKey: "gameId"
    })
  };

  return Game;
};
