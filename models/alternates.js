'use strict';
module.exports = function(sequelize, DataTypes) {
  var Alternate = sequelize.define('Alternate', {
    deckId: DataTypes.INTEGER,
    front: DataTypes.STRING,
    back: DataTypes.STRING
  }, {});

  Alternate.associate = function(models) {
    Alternate.belongsTo(models.Game, {
      as: "Games",
      foreignKey: "gameId"
    })
    Alternat.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userId"
    })
  };

  return Alternate;
};
