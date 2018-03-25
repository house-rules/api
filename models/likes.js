'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    alternateId: DataTypes.INTEGER
  }, {});

  Like.associate = function(models) {
    Like.belongsTo(models.Alternate, {
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
