const { Model, DataTypes } = require('sequelize');

class Student extends Model {
   static init(connection) {
      super.init(            {
         first_name: DataTypes.STRING,
         last_name: DataTypes.STRING,
         email: DataTypes.STRING,
         birthday: DataTypes.DATEONLY,
         password: DataTypes.STRING
      }, {
         sequelize: connection
      })
   }

   static associate(models) {
      this.belongsToMany(models.Exam, {foreignKey: 'student_id', through: 'student_exam'});
      this.belongsTo(models.Class, {
         foreignKey: 'class_id',
         target: 'id'
        })
   } 


}

module.exports = Student;
