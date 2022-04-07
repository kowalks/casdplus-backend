const { Model, DataTypes } = require("sequelize");
const crypto = require("crypto");
const moment = require("moment-timezone");
const sendEmail = require("../../utils/sendEmail");

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
        recoverPasswordToken: DataTypes.STRING,
        recoverPasswordExpires: DataTypes.DATEONLY,
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
    const student = await Student.findOne({ where: { username} });

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

  static async generateTokenForRecoverPassword(student) {
    

    student.resetPasswordToken = crypto.randomBytes(20).toString("hex");

    student.resetPasswordExpires = moment
    .tz("America/Sao_Paulo")
    .add(1, "hours")
    .toDate();

    await student.save();
  }

  static async sendRecoverPasswordEmail(){
    const student = this;
    const name = student.name;
    const email = student.email;
    const token = student.resetPasswordToken;

    const link = `${process.env.CLIENT_URL}/resetPassword/${token}`;
    const subject = "Mudança de senha";
    const content = `<p>Olá ${name}</p> <p>Por favor clique no seguinte botão para modificar sua senha.</p>
  
    <p><b>Caso a senha não seja modificada em duas horas, será necessário gerar
    outra solicitação. </b>  </p>
    
    <p> <br></p> 
    
    <a href=${link} style= " background-color: #1D1D1D; box-shadow: 0 5px 0 darkred; color: white; padding: 1em 1.5em; position: relative;
    ">Clique Aqui</a> 
  
    <p><br>Caso a mudança não tenha sido solicitada, ignore esse 
    email e a senha continuará a ser a mesma</p>`;
  
    sendEmail(content, email, subject);
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

class Absence extends Model {
  static init(connection) {
     super.init(            {
           date: DataTypes.DATEONLY,
           justification: DataTypes.STRING,
           file: DataTypes.STRING
     }, {
           sequelize: connection,
           tableName: 'absence',
           freezeTableName: true,
     })
  }
}

Absence.associate = function(models) {
  Absence.belongsTo(models.Student, {
   foreignKey: 'student_id',
   target: 'id'
  });
}

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

class Student_exam extends Model {
  static init(connection) {
      super.init(            {
       // class_id:DataTypes.INTEGER,
       // message_id:DataTypes.INTEGER
      }, {
          sequelize: connection
      })
  }
}

module.exports = { 
  Student,
  StudentToken, 
  Absence,
  Student_class,
  Student_exam,
};
