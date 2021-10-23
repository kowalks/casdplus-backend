'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('classes', { 
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
     sala: {
      type: DataTypes.STRING,
      allowNull: true
   },
     schedule: {
        type: DataTypes.STRING
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
  
     await queryInterface.dropTable('classes');

  }
};

