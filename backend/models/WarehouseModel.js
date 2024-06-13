import pool from '../config/Database.js';
import { uuidv7 } from 'uuidv7';

export const getWarehouseModel = () => {
    query = `SELECT * FROM warehouse WHERE deleted_date IS NULL`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const getWarehouseByIdModel = (uuid_warehouse) => {
    query = `SELECT * FROM warehouse WHERE uuid_warehouse=? AND deleted_date IS NULL`;

    return new Promise((resolve, reject) => {
        pool.query(query, [uuid_warehouse], (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const createWarehouseModel = (data) => {
    const query = `INSERT INTO warehouse(uuid_warehouse, nama_warehouse, alamat_warehouse, created_date, updated_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

    const uuid_warehouse = uuidv7();
    const values = [
        uuid_warehouse,
        data.nama_warehouse,
        data.alamat_warehouse,
    ]
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const updateWarehouseModel = (data) => {
    const query = `UPDATE warehouse SET nama_warehouse=?, alamat_warehouse=?, updated_date=CURRENT_TIMESTAMP WHERE uuid_warehouse=?;`;

    const values = [
        data.nama_warehouse,
        data.alamat_warehouse,
        data.uuid_warehouse,
    ]
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const deleteWarehouseModel = async (uuid_warehouse) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE warehouse SET deleted_date=CURRENT_TIMESTAMP WHERE uuid_warehouse=?", [uuid_warehouse], (err, result, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        })
    });
};
