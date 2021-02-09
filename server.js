require("dotenv").config(/* { path: __dirname + "/.env" } */);

const server = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
server.use(morgan("dev"));
//Route
const router = require("./src/routes");

//Middleware
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router);

module.exports = server;
