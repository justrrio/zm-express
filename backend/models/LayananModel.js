import pool from '../config/Database.js';

export const getLayananModel = () => {
    const query = `SELECT nama_layanan, harga_layanan FROM layanan WHERE deleted_date IS NULL`;

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

export const getLayananByIdModel = (id_layanan) => {
    const query = `SELECT nama_layanan, harga_layanan FROM layanan WHERE id_layanan=? AND deleted_date IS NULL`;

    return new Promise((resolve, reject) => {
        pool.query(query, [id_layanan], (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const createLayananModel = (data) => {
    const query = `INSERT INTO layanan(nama_layanan, harga_layanan, created_date, updated_date) VALUES(?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

    const values = [
        data.nama_agen,
        data.alamat_agen,
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

export const updateLayananModel = (data) => {
    const query = `UPDATE layanan SET nama_layanan=?, harga_layanan=?, updated_date=CURRENT_TIMESTAMP WHERE id_layanan=?;`;

    const values = [
        data.nama_layanan,
        data.harga_layanan,
        data.id_layanan,
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

export const deleteLayananModel = async (uuid_agen) => {
    const query = `UPDATE layanan SET deleted_date=CURRENT_TIMESTAMP WHERE uuid_layanan=?`
    return new Promise((resolve, reject) => {
        pool.query(query, [uuid_agen], (err, result, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        })
    });
};
