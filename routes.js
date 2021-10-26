const express = require('express');

const StudentController = require('./controllers/StudentController')
const ClassController = require('./controllers/ClassController')
const MessageController = require('./controllers/MessageController');
const AdminController = require('./controllers/AdminController');
const EventController = require('./controllers/EventController');

const multer = require('multer');
const upload = multer({ dest: 'tmp/' })

const routes = express.Router();

// Admin routes
routes.post('/admin/students', StudentController.store);

routes.post('/admin/students_bulk', upload.single('avatar'), StudentController.bulk_store)

routes.post('/admin/login', AdminController.login);

routes.get('/admin/', AdminController.info)

routes.post('/admin/', AdminController.store);

routes.post('/admin/:class_id/messages', MessageController.store);


// Student routes

routes.get('/student/', StudentController.info)

routes.get('/student/messages', StudentController.messages)

routes.get('/student/events', StudentController.events)

routes.post('/student/login', StudentController.login);

routes.post('/classes', ClassController.store);

routes.post('/:class_id/messages', MessageController.store);

routes.post('/:class_id/events', EventController.store);

// Hello World
routes.get('/', function (req, res) {
    res.send('<h1>Hello World </h1>')
})

module.exports = routes;