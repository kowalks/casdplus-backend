'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('student_class', { 
      student_id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        references: { model: 'students', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     }, 
     class_id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        references: { model: 'classes', key: 'id'},
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
  
     await queryInterface.dropTable('student_class');

  }
};

