'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('messages', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 
      admin_id: {
          type: DataTypes.INTEGER, 
          allowNull:false,
          references: { model: 'admins', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      }, 
      title: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      body: {
          type: DataTypes.TEXT,
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
  
     await queryInterface.dropTable('messages');

  }
};

