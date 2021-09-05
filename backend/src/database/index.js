const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Student = require('../models/Student');

const connection = new Sequelize(dbConfig);

Student.init(connection);

module.exports = connection;