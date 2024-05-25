import pool from '../config/Database.js'

export const getUsersModel = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users", (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

export const getUserByIdModel = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE id=?", [id], (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}