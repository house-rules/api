'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Game', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
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
  }

  return Game;
};
