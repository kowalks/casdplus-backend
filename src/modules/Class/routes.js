const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});


const ClassController = require("./controllers");

const routes = express.Router();


routes.post("/admin/classes", ClassController.store);
routes.get("/admin/classes", ClassController.classes);
routes.patch("/admin/classes/:class_id/schedule", schedule.single("file"), ClassController.newSchedule);
routes.get("/admin/classes/:class_id/schedule", ClassController.schedule)

module.exports = routes;
