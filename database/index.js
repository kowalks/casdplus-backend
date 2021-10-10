const Sequelize = require("sequelize");

const Student = require("../models/Student");
const Class = require("../models/Class");
const Event = require("../models/Event");
const Absence = require("../models/Absence");
const Question = require("../models/Question");
const Exam = require("../models/Exam");
const Message = require("../models/Message");
const Admin = require("../models/Admin");
const AdminToken = require("../models/AdminToken");
const StudentToken = require("../models/StudentToken");

const config = require("../config/config.json");

if (process.env.DATABASE_URL) {
  connection = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  connection = new Sequelize(config.development);
}

// const { configure } = require('sequelize-pg-utilities')
// const config = require('../config/config.json')
// const { name, user, password, options } = configure(config)
// console.log(name, user, password, options)
// const connection = new Sequelize(name, user, password, options);
// console.log(connection)

// const dbConfig = require('../config/database.js')
// const connection = new Sequelize(dbConfig)
// console.log(connection)

// const dbConfig = require('../config/config.json')
// console.log(connection)

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
