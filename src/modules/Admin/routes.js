const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const schedule = multer({ dest: "schedule/"});
const justify = multer({ dest: "justify/"});


const AdminController = require("./controllers");

const routes = express.Router();
routes.post("/admin/login", AdminController.login);
routes.delete("/admin/logout", AdminController.logout);

routes.get("/admin/", AdminController.info);
routes.post("/admin/", AdminController.store);

module.exports = routes;
