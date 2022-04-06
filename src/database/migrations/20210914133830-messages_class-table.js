'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('message_class', { 
      id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        allowNull:false,
        autoIncrement: true
     }, 

      class_id: {
        type: DataTypes.INTEGER, 
        // primaryKey:true, 
        allowNull:false,
        references: { model: 'classes', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     }, 
     message_id: {
        type: DataTypes.INTEGER, 
        // primaryKey:true, 
        allowNull:false,
        references: { model: 'messages', key: 'id'},
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
  
     await queryInterface.dropTable('message_class');

  }
};

