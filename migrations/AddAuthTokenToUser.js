'use strict';

var user = require('../models/user');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

     authToken: {
      type: Sequelize.STRING(60)
     },
     authTokenExpiration: {
      type: Sequelize.DATE
     }
    */
    queryInterface.addColumn('users', 'authToken', {
      type: Sequelize.STRING(60)
    });
    queryInterface.addColumn('users', 'authTokenExpiration', {
      type: Sequelize.DATE
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
