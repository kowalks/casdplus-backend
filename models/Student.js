const { Model, DataTypes } = require("sequelize");
const StudentToken = require("../models/StudentToken");

class Student extends Model {
  static init(connection) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        birthday: DataTypes.DATEONLY,
        password: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "students",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    //this.belongsToMany(models.Exam, {foreignKey: 'student_id', through: 'student_exam'});
    this.belongsToMany(models.Class, {
      foreignKey: "student_id",
      through: "student_class",
      as: "classes"
    });
    this.hasMany(models.StudentToken);
  }

  static async authenticate(username, password) {
    const student = await Student.findOne({ where: { username } });

    if (password == student.password) {
      return student;
    }

    throw new Error("invalid password");
  }

  async authorize() {
    const student = this;

    const token = await StudentToken.generate(this.id);

    await student.addStudentToken(token);

    return { student, token };
  }

  static async validate(req, res) {
    const bearer_token = req.headers.authorization;
    if (bearer_token == null) {
      return [res.status(401).send("No token provided."), null];
    }

    const token = bearer_token.substring(7);
    const student_token = await StudentToken.findOne({ where: { token } });

    if (student_token == null) {
      return [res.status(401).send("Auth token is not valid."), null];
    }

    const id = student_token.student_id;
    return [res.status(200), id];
  }
}

module.exports = Student;
