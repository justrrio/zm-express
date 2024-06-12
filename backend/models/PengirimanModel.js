import pool from "../config/Database.js";

/**
 * Get pengiriman data from the database.
 * @returns {Promise} Promise object represents the result of the query.
 */
export const getPengirimanModel = () => {
    const query = `
        SELECT 
            nama_pengirim, p_pengirim.nama_provinsi AS p_pengirim, kk_pengirim.nama_kabupaten_kota AS kk_pengirim, kode_pos_pengirim, no_tlp_pengirim, 
            nama_penerima, p_penerima.nama_provinsi AS p_penerima, kk_penerima.nama_kabupaten_kota AS kk_penerima, kode_pos_penerima, no_tlp_penerima,
            nama_barang, jumlah_barang, berat, harga_pengiriman, tanggal, l.nama_layanan AS nama_layanan, deskripsi, no_resi
        FROM 
            pengiriman
        INNER JOIN provinsi AS p_pengirim ON p_pengirim.id_provinsi = pengiriman.id_provinsi_pengirim
        INNER JOIN provinsi AS p_penerima ON p_penerima.id_provinsi = pengiriman.id_provinsi_penerima
        INNER JOIN kabupaten_kota AS kk_pengirim ON kk_pengirim.id_kabupaten_kota = pengiriman.id_kabupaten_kota_pengirim
        INNER JOIN kabupaten_kota AS kk_penerima ON kk_penerima.id_kabupaten_kota = pengiriman.id_kabupaten_kota_penerima
        INNER JOIN layanan AS l ON (l.id_layanan = pengiriman.id_layanan)
        WHERE pengiriman.deleted_date IS NULL;
    `;
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    });
}

export const getPengirimanByIdModel = (id) => {
    const query = `
        SELECT 
            nama_pengirim, p_pengirim.nama_provinsi AS p_pengirim, kk_pengirim.nama_kabupaten_kota AS kk_pengirim, kode_pos_pengirim, no_tlp_pengirim, 
            nama_penerima, p_penerima.nama_provinsi AS p_penerima, kk_penerima.nama_kabupaten_kota AS kk_penerima, kode_pos_penerima, no_tlp_penerima,
            nama_barang, jumlah_barang, berat, harga_pengiriman, tanggal, l.nama_layanan AS nama_layanan, deskripsi, no_resi
        FROM 
            pengiriman
        INNER JOIN provinsi AS p_pengirim ON p_pengirim.id_provinsi = pengiriman.id_provinsi_pengirim
        INNER JOIN provinsi AS p_penerima ON p_penerima.id_provinsi = pengiriman.id_provinsi_penerima
        INNER JOIN kabupaten_kota AS kk_pengirim ON kk_pengirim.id_kabupaten_kota = pengiriman.id_kabupaten_kota_pengirim
        INNER JOIN kabupaten_kota AS kk_penerima ON kk_penerima.id_kabupaten_kota = pengiriman.id_kabupaten_kota_penerima
        INNER JOIN layanan AS l ON (l.id_layanan = pengiriman.id_layanan)
        WHERE pengiriman.id_pengiriman = ${id} AND pengiriman.deleted_date IS NULL; 
    `
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, field) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}