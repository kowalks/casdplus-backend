const express = require('express');
const StudentController = require('./controllers/StudentController')
const routes = express.Router();


routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);

module.exports = routes;