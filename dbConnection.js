var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"ecommerce_db"
});

connection.connect((err) => {
    err ? console.log("Not connected with server") : console.log("Connected with server");
});

module.exports = connection;
