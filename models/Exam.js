const { Model, DataTypes } = require("sequelize");

class Exam extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        published: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
        tableName: "exams",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Student, {
      foreignKey: "exam_id",
      through: "class_exam",
      as: "classes"
    });
  }
}

module.exports = Exam;
