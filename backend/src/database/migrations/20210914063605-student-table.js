'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('students', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
     class_id: {
        type: DataTypes.INTEGER, 
        allowNull:true,
        references: { model: 'classes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
     }, 
     first_name: {
        type: DataTypes.STRING
     }, 
     last_name: {
        type: DataTypes.STRING
     }, 
     birthday: {
        type: DataTypes.DATEONLY
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
  
     await queryInterface.dropTable('students');

  }
};

