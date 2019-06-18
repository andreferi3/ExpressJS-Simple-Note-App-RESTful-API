// filename server
// author andreferi

// Initialize express, body-parser, routes
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");

// Initialize for the app
const app = express();

// set port
const env = require('./config');

// use bodyParser
app.use(bodyParser.json());

// use cors
app.use(cors());

// define routes
routes(app);

// Listen to server with specified port
app.listen(env.PORT);
console.log("Server listening at port : " + env.PORT);