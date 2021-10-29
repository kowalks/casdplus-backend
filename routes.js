const express = require("express");

const StudentController = require("./controllers/StudentController");
const ClassController = require("./controllers/ClassController");
const MessageController = require("./controllers/MessageController");
const AdminController = require("./controllers/AdminController");
const EventController = require("./controllers/EventController");

const multer = require("multer");
const upload = multer({ dest: "tmp/" });

const routes = express.Router();

// Admin routes
routes.get("/admin/", AdminController.info);

routes.post("/admin/", AdminController.store);

routes.post("/admin/students", StudentController.store);

routes.get("/admin/students", StudentController.students);

routes.post("/admin/students_bulk", upload.single("file"), StudentController.bulk_store);

routes.post("/admin/login", AdminController.login);

routes.post("/admin/classes/:class_id/messages", MessageController.store);

routes.post("/admin/classes/:class_id/events", EventController.store);

routes.post("/admin/classes", ClassController.store);

routes.get("/admin/classes", ClassController.classes);

routes.delete("/admin/logout", AdminController.logout);

routes.get("/admin/categorias", AdminController.labels);

routes.get("/admin/messages", AdminController.messages);

routes.patch("/admin/messages/:message_id", AdminController.pin);



// Student routes

routes.get("/student/", StudentController.info);

routes.get("/student/messages", StudentController.messages);

routes.get("/student/events", StudentController.events);

routes.get("/student/classes", StudentController.classes);

routes.post("/student/login", StudentController.login);

routes.delete("/student/logout", StudentController.logout);

// Hello World
routes.get("/", function (req, res) {
  res.send("<h1>Hello World </h1>");
});

module.exports = routes;
