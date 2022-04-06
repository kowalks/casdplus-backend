"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("labels", [
      {
        label: "Evento",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "Horário",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "Material",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "Simulado",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "Vestibular",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: "Outros",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("labels", null, {});
  },
};
