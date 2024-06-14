import pool from '../config/Database.js';

export const getKategoriBarangModel = () => {
    const query = `SELECT nama_kategori_barang FROM kategori_barang WHERE deleted_date IS NULL`;

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    });
}

export const getKategoriBarangByIdModel = (id_kategori_barang) => {
    const query = `SELECT nama_kategori_barang FROM kategori_barang WHERE id_kategori_barang=? AND deleted_date IS NULL`;

    return new Promise((resolve, reject) => {
        pool.query(query, [id_kategori_barang], (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        }); 
    })
}

export const createKategoriBarangModel = (data) => {
    const query = `INSERT INTO kategori_barang(nama_kategori_barang, created_date, updated_date) VALUES(?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

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

export const updateKategoriBarangModel = (data) => {
    const query = `UPDATE kategori_barang SET nama_kategori_barang=?, updated_date=CURRENT_TIMESTAMP WHERE id_kategori_barang=?;`;

    const values = [
        data.nama_kategori_barang,
        data.id_kategori_barang,
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

export const deleteKategoriBarangModel = async (id_kategori_barang) => {
    const query = `UPDATE kategori_barang SET deleted_date=CURRENT_TIMESTAMP WHERE id_kategori_barang=?`
    return new Promise((resolve, reject) => {
        pool.query(query, [id_kategori_barang], (err, result, fields) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(result);
            }
        })
    });
};
