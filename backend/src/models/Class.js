const { Model, DataTypes } = require('sequelize');

class Class extends Model {
   static init(connection) {
      super.init(            {
         name: DataTypes.STRING,
         schedule: DataTypes.STRING
      }, {
         sequelize: connection,
         timestamps: true,
         underscored: true
      })
   }

   static associate(models) {
      this.belongsToMany(models.Message, {foreignKey: 'class_id', through: 'message_class'})
      this.belongsToMany(models.Student, {foreignKey: 'class_id', through: 'student_class'})
   } 

}

module.exports = Class;
