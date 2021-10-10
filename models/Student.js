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

  logout = async function (token) {
    StudentToken.destroy({ where: { token } });
  };
}

module.exports = Student;
