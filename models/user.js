'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email:    DataTypes.STRING,
    password: DataTypes.STRING,
    salt:     DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Game, {
      as: "Games",
      foreignKey: "userId"
    })
    User.hasMany(models.Alternate, {
      as: "Alternates",
      foreignKey: "userId"
    })
    User.hasMany(models.Like, {
      as: "Likes",
      foreignKey: "userId"
    })
  };

  return User;
};
