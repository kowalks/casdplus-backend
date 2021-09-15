'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('admins', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
     first_name: {
        type: DataTypes.STRING
     }, 
     last_name: {
        type: DataTypes.STRING
     }, 
     password: {
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
  
     await queryInterface.dropTable('admins');

  }
};

