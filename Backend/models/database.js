const mysql = require('mysql2/promise');

const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "mysql123",
            database: "expense_tracker"
        });

        console.log("Database connected successfully!");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        throw error;
    }
};

module.exports = createConnection;
