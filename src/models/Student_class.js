const { Model, DataTypes } = require("sequelize");

class Student_class extends Model {
  static init(connection) {
    super.init(
      {
        class_id:DataTypes.INTEGER,
        student_id:DataTypes.INTEGER
      },
      {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        tableName: "student_class",
        freezeTableName: true,
      }
    );
  }
}

module.exports = Student_class;
