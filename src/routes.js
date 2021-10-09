const express = require('express');
const StudentController = require('./controllers/StudentController')
const ClassController = require('./controllers/ClassController')
const MessageController = require('./controllers/MessageController');
const AdminController = require('./controllers/AdminController');
const routes = express.Router();

// Admin routes
routes.post('/admin/students', StudentController.store);

routes.get('/admin/login', AdminController.login);

routes.post('/admin/admins', AdminController.store);


// Student routes

routes.get('/student/login', StudentController.login);

routes.post('/classes', ClassController.store);

routes.post('/:class_id/messages', MessageController.store);

// Hello World
routes.get('/', function (req, res) {
    res.send('<h1>Hello World </h1>')
})

module.exports = routes;