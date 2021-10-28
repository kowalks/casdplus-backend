"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("message_class", [
      {
        class_id: 2,
        message_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_id: 2,
        message_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_id: 2,
        message_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_id: 1,
        message_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        class_id: 1,
        message_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("message_class", null, {});
  },
};
