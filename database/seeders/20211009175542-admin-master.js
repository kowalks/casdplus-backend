'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [{
      first_name: 'Admin',
      last_name: 'Master',
      username: 'admin',
      password: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
