'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('admin_tokens', { 
       id: {
         type: DataTypes.INTEGER, 
         primaryKey:true, 
         allowNull:false,
         autoIncrement: true
     },
     admin_id: {
        type: DataTypes.INTEGER,
        references: { model: 'admins', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
     },
     token: {
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
  }
  );

  },

  down: async (queryInterface, DataTypes) => {
  
     await queryInterface.dropTable('admin_tokens');

  }
};

