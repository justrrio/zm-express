import pool from '../config/Database.js';
import { v4 as uuidv4 } from 'uuid';

export const getUsersModel = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT uuid, email, nama_lengkap, no_tlp, role FROM users", (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                console.log("UUID:", uuidv4());
                resolve(results);
            }
        })
    });
}

export const getUserByIdModel = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT uuid, email, nama_lengkap, no_tlp, role FROM users WHERE uuid=?", [id], (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const getUserByEmailModel = (email) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE email=?", [email], (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const createUserModel = (name, email, hashedPassword, phoneNumber, role) => {
    return new Promise((resolve, reject) => {
        const uuid = uuidv4();

        pool.query("INSERT INTO users(uuid, email, nama_lengkap, password, no_tlp, role, created_by, created_date, updated_by, updated_date) VALUES(?, ?, ?, ?, ?, ?, NULL, CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP)", [uuid, email, name, hashedPassword, phoneNumber, role], (err, results, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(results);
            }
        });
    });
}

export const updateUserModel = (id, name, email, hashedPassword, phoneNumber) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE users SET email=?, nama_lengkap=?, password=?, no_tlp=? where uuid=?", [email, name, hashedPassword, phoneNumber, id], (err, result, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        })
    });
}

export const deleteUserModel = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM users WHERE uuid=?", [id], (err, result, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        })
    });
};