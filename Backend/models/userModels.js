// models/userModels.js

const db = require('./database');

db.query(`
  CREATE TABLE IF NOT EXISTS myusers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    premium BOOLEAN DEFAULT false
  );
`);

module.exports = db;