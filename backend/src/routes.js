const express = require('express');
const StudentController = require('./controllers/StudentController')
const ClassController = require('./controllers/ClassController')
const MessageController = require('./controllers/MessageController');
const AdminController = require('./controllers/AdminController');
const routes = express.Router();


routes.post('/classes', ClassController.store);

routes.post('/students', StudentController.store);

routes.post('/:class_id/messages', MessageController.store);

routes.post('/admins', AdminController.store);

module.exports = routes;