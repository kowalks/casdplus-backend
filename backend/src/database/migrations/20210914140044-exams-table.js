'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('exams', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
     name: {
        type: DataTypes.STRING,
        allowNull: false
     }, 
     date: {
        type: DataTypes.DATEONLY
     }, 
     published: {
        type: DataTypes.BOOLEAN
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
  
     await queryInterface.dropTable('exams');

  }
};

