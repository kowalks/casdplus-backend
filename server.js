const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("./database");

const app = express();

app.use(express.json());
app.use(cors({"methods": "GET,PUT,PATCH,POST,DELETE"}));
app.options('*', cors());

app.use(routes);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   app.use(cors());
//   next();
// });

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
