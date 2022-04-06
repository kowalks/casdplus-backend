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

    console.log(bearer_token);

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

  static validate_age(birthday){
    let birthday_date = new Date(birthday);
    let month_diff = Date.now() - birthday_date.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = (year - 1970)

    return (age >= 0 && age < 100)
  }
}

class StudentToken extends Model {
  static init(connection) {
    super.init(
      {
        student_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
      },
      {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        tableName: "student_tokens",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student);
  }

  // generate random access token
  static async generate(studentId) {
    if (!studentId) {
      throw new Error("AuthToken requires a user ID");
    }

    let token = "";

    const str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
      token += str.charAt(Math.floor(Math.random() * str.length));
    }

    return await StudentToken.create({ token, student_id: studentId });
  }
}

module.exports = { 
  Student,
  StudentToken, 
};
