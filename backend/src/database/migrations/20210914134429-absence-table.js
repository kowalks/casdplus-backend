'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('absence', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
     student_id: {
        type: DataTypes.INTEGER, 
        allowNull:false
     }, 
     date: {
        type: DataTypes.DATEONLY
     }, 
     justification: {
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
  
     await queryInterface.dropTable('absence');

  }
};

