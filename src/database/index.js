const Sequelize = require("sequelize");

const { Student, Absence, StudentToken }= require("../modules/Students/models");
const { Class } = require("../modules/Class/models");
const { Event } = require("../modules/Events/models");
const { Exam, Question } = require("../modules/Exams/models");
const { Message, Label } = require("../modules/Messages/models");
const { Admin, AdminToken }= require("../modules/Admin/models");

const config = require("../../config/config.json");

if (process.env.DATABASE_URL) {
  console.log("Estou fazendo tudo certo :)");
  connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  });
} else {
  connection = new Sequelize(config.development);
}

Student.init(connection);
Class.init(connection);
Event.init(connection);
Absence.init(connection);
Question.init(connection);
Exam.init(connection);
Message.init(connection);
Admin.init(connection);
AdminToken.init(connection);
StudentToken.init(connection);
Label.init(connection);

Student.associate(connection.models);
Event.associate(connection.models);
Absence.associate(connection.models);
Question.associate(connection.models);
Message.associate(connection.models);
Class.associate(connection.models);
Admin.associate(connection.models);
AdminToken.associate(connection.models);
StudentToken.associate(connection.models);

module.exports = connection;
