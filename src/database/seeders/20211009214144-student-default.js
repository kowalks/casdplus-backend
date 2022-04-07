"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("students", [
      {
        first_name: "Aluno",
        last_name: "Padrao",
        birthday: "10-10-1996",
        username: "aluno",
        email: "hentt30@gmail.com",
        password: "myPass",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Aluninho",
        last_name: "Padrao",
        birthday: "10-10-2005",
        username: "aluninho",
        email: "emailaluninho@gmail.com",
        password: "aluninho",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Blank",
        last_name: "User",
        birthday: "10-10-2024",
        username: "blank",
        email: "blank@gmail.com",
        password: "blank",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("students", null, {});
  },
};
