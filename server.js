// filename server
// author andreferi

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();

// set port
const env = require('./config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const configCors = {
    origin: ['http://192.168.100.15', 'http://192.168.100.56', 'http://192.168.100.28'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
};

app.use(cors(configCors));

routes(app);

// Listen to server with specified port
app.listen(env.PORT, () => {
    console.log("Server listening at port : " + env.PORT);
});