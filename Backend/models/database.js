// models/database.js

const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password : "mysql123",
    database:"expense_tracker"
});

db.connect(err => {
    if(err) {
        console.error("Database connection failed : "+err.stack);
        return;
    }
    console.log("Connected to database");
});


module.exports = db;
