'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
 
     await queryInterface.createTable('student_tokens', { 
       id: {
         type: DataTypes.INTEGER, 
         primaryKey:true, 
         allowNull:false,
         autoIncrement: true
     },
     student_id: {
        type: DataTypes.INTEGER,
        references: { model: 'students', key: 'id'},
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
  
     await queryInterface.dropTable('student_tokens');

  }
};

