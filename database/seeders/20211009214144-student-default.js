'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('students', [{
      first_name: 'Aluno',
      last_name: 'Padrao',
      birthday: '10-10-1996',
      username: 'useraluno',
      email: 'emailaluno@gmail.com',
      password: 'aluno',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('students', null, {});
  }
};
