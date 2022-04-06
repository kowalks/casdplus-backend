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


class Question extends Model {
  static init(connection) {
    super.init(
      {
        answer: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "questions",
        freezeTableName: true,
      }
    );
  }
}

Question.associate = function (models) {
  Question.belongsTo(models.Exam, {
    foreignKey: "exam_id",
    target: "id",
  });
};

module.exports = { 
  Exam,
  Question,
};
