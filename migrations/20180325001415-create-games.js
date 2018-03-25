'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numberOfPlayers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      playerAgeRange: {
        type: Sequelize.STRING,
        allowNull: false
      },
      objective: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productLink: {
        type: Sequelize.STRING
      },
      rules: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games');
  }
};
