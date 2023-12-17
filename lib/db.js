const db = require('mariadb');
require('dotenv').config();

const pool = db.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 151
});

// Export the pool
module.exports = pool;