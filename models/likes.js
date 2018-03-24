'use strict';
module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    userId:      DataTypes.STRING,
    alternateId: DataTypes.INTEGER
  }, {});

  Like.associate = function(models) {
    Like.belongsTo(models.Game, {
      as: "Alternates",
      foreignKey: "alternateId"
    })
    Like.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userId"
    })
  };

  return Like;
};
