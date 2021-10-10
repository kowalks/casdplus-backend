'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [{
      name: 'CASDinho',
      schedule: 'http://www.instagram.com/casdsjc',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'CASDvest',
      schedule: 'http://www.instagram.com/casdsjc',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
