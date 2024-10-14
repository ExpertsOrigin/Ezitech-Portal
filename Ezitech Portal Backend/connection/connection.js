const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "internportal"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully")
})

module.exports = connection;