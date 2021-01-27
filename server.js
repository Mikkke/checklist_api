require("dotenv").config({ path: __dirname + "/.env" });

const server = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

//Route
const mainRouter = require("./src/routes");
server.use(mainRouter);

//Middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors);
server.use(morgan("dev"));

module.exports = server;
