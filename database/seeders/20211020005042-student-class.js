"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("student_class", [
      {
        student_id: 1,
        class_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: 2,
        class_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        student_id: 3,
        class_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("student_class", null, {});
  },
};
