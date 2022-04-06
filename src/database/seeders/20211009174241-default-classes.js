'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [{
      name: 'CASDinho',
      schedule: '',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'CASDvest',
      schedule: '',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'CASDblank',
      schedule: '',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
