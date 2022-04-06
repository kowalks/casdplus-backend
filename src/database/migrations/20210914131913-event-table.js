'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('events', { 
       id: {
         type: DataTypes.INTEGER, 
         primaryKey:true, 
         allowNull:false,
         autoIncrement: true
     }, 
     name: {
        type: DataTypes.STRING
     }, 
     description: {
      type: DataTypes.STRING
   }, 
   date: {
      type: DataTypes.DATEONLY
   }, 
   class_id: {
      type: DataTypes.INTEGER, 
      allowNull:false,
      references: { model: 'classes', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
   }
  ,
    created_at:{
      type: DataTypes.DATE,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }
  );

  },

  down: async (queryInterface, DataTypes) => {
  
     await queryInterface.dropTable('events');

  }
};

