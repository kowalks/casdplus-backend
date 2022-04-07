const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});

const EventController = require("./controllers");

const routes = express.Router();

routes.get("/admin/events", EventController.events);
routes.post("/admin/events", EventController.store);
routes.delete("/admin/events/:event_id", EventController.destroy);

module.exports = routes;
