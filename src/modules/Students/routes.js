const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});

const StudentController = require("./controllers");

const routes = express.Router();

routes.get("/student/", StudentController.info);
routes.get("/student/messages", StudentController.messages);
routes.get("/student/events", StudentController.events);
routes.get("/student/classes", StudentController.classes);
routes.get("/student/schedule", StudentController.schedule);
routes.post("/student/login", StudentController.login);
routes.delete("/student/logout", StudentController.logout);
routes.post("/student/absence", justify.single("file"), StudentController.absence);
routes.post("/student/recoverPassword",StudentController.recoverPassword);
routes.post("/admin/students", StudentController.store);
routes.get("/admin/students", StudentController.students);
routes.post("/admin/students_bulk", upload.single("file"), StudentController.bulk_store);
routes.delete("/admin/students/:student_id", StudentController.destroy);

module.exports = routes;
