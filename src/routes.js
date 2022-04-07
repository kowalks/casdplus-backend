const express = require("express");

const StudentRouter = require("./modules/Students/routes");
const ClassRouter = require("./modules/Class/routes");
const MessageRouter = require("./modules/Messages/routes");
const AdminRouter = require("./modules/Admin/routes");
const EventRouter = require("./modules/Events/routes");

const routes = express.Router();
routes.use(StudentRouter);
routes.use(AdminRouter);
routes.use(EventRouter);
routes.use(MessageRouter);
routes.use(ClassRouter);

// Hello World
routes.get("/", function (req, res) {
  res.send("<h1>:)</h1>");
});

module.exports = routes;
