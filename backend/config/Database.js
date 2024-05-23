// import dotenv from "dotenv";
import mysql2 from "mysql2";

// dotenv.config({ 
//     path: '../.env',
// }); // Adjust the path to point to your .env file

const pool = mysql2.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
});

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

pool.query("SELECT * FROM biodata", (err, results, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(results);
});

export default pool;