// filename connect.js
// author andreferi

// Initialize mysql
const mysql = require("mysql");
const env = require("../config");

// make connection
const conn = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
});

conn.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log("Success connect to database!");
    }
});

module.exports = conn;