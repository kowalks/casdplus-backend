'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('questions', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
      exam_id: {
          type: DataTypes.INTEGER, 
          allowNull:false,
          references: { model: 'exams', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      answer: {
         type: DataTypes.STRING
      },
      created_at:{
        type: DataTypes.DATE,
        allowNull: false,
      },
  
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
  });

  },

  down: async (queryInterface, DataTypes) => {
  
     await queryInterface.dropTable('questions');

  }
};

