'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('class_exam', { 
      class_id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        references: { model: 'classes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     }, 
     exam_id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        references: { model: 'exams', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
  
     await queryInterface.dropTable('class_exam');

  }
};

