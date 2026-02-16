require('dotenv').config();
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

module.exports = db;
