const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Student = require('../models/Student');
const Class = require('../models/Class');
const Message_class = require('../models/message_class');
const Event = require('../models/Event');
const Absence = require('../models/Absence');
const Question = require('../models/question');
const Exam = require('../models/Exam');
const Message = require('../models/Message');
const Admin = require('../models/Admin');

const connection = new Sequelize(dbConfig);

Student.init(connection);
Class.init(connection);
Event.init(connection);
Absence.init(connection);
Question.init(connection);
Exam.init(connection);
Message.init(connection);
Admin.init(connection);

Student.associate(connection.models);
Event.associate(connection.models);
Absence.associate(connection.models);
Question.associate(connection.models);
Message.associate(connection.models);
Class.associate(connection.models);


module.exports = connection;