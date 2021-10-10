'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('Admins', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
     first_name: {
        type: DataTypes.STRING,
        allowNull: false
     }, 
     last_name: {
        type: DataTypes.STRING,
        allowNull: false
     },
     username: {
      type: DataTypes.STRING,
      allowNull: false
   }, 
     password: {
        type: DataTypes.STRING,
        allowNull: false
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

