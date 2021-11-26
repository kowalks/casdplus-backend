const express = require("express");

const StudentController = require("./controllers/StudentController");
const ClassController = require("./controllers/ClassController");
const MessageController = require("./controllers/MessageController");
const AdminController = require("./controllers/AdminController");
const EventController = require("./controllers/EventController");

const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});

const routes = express.Router();

// Admin routes
routes.post("/admin/login", AdminController.login);
routes.delete("/admin/logout", AdminController.logout);

routes.get("/admin/", AdminController.info);
routes.post("/admin/", AdminController.store);

routes.post("/admin/students", StudentController.store);
routes.get("/admin/students", StudentController.students);
routes.post("/admin/students_bulk", upload.single("file"), StudentController.bulk_store);
routes.delete("/admin/students/:student_id", StudentController.destroy);

routes.post("/admin/classes", ClassController.store);
routes.get("/admin/classes", ClassController.classes);
routes.patch("/admin/classes/:class_id/schedule", schedule.single("file"), ClassController.newSchedule);
routes.get("/admin/classes/:class_id/schedule", ClassController.schedule)

routes.get("/admin/messages", MessageController.messages);
routes.get("/admin/categorias", MessageController.labels);
routes.post("/admin/messages", MessageController.store);
routes.patch("/admin/messages/:message_id", MessageController.pin);
routes.delete("/admin/messages/:message_id", MessageController.destroy);

routes.get("/admin/events", EventController.events);
routes.post("/admin/events", EventController.store);
routes.delete("/admin/events/:event_id", EventController.destroy);

// Student routes

routes.get("/student/", StudentController.info);
routes.get("/student/messages", StudentController.messages);
routes.get("/student/events", StudentController.events);
routes.get("/student/classes", StudentController.classes);
routes.get("/student/schedule", StudentController.schedule);
routes.post("/student/login", StudentController.login);
routes.delete("/student/logout", StudentController.logout);
routes.post("/student/absence", justify.single("file"), StudentController.absence);


// Hello World
routes.get("/", function (req, res) {
  res.send("<h1>Hello World </h1>");
});

module.exports = routes;
