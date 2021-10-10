const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

const Student = require('../models/Student');
const Class = require('../models/Class');
const Event = require('../models/Event');
const Absence = require('../models/Absence');
const Question = require('../models/Question');
const Exam = require('../models/Exam');
const Message = require('../models/Message');
const Admin = require('../models/Admin');
const AdminToken = require('../models/AdminToken');
const StudentToken = require('../models/StudentToken');

const connection = new Sequelize(dbConfig.production);

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