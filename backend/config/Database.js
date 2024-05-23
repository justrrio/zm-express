import dotenv from 'dotenv';
dotenv.config();

import mysql2 from "mysql2";

const pool = mysql2.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
});

pool.query("SELECT * FROM biodata", (err, results, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(results);
});

export default pool;