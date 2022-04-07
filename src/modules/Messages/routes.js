const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});


const MessageController = require("./controllers");

const routes = express.Router();

routes.get("/admin/messages", MessageController.messages);
routes.get("/admin/categorias", MessageController.labels);
routes.post("/admin/messages", MessageController.store);
routes.patch("/admin/messages/:message_id", MessageController.pin);
routes.delete("/admin/messages/:message_id", MessageController.destroy);

module.exports = routes;
