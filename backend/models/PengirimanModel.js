import pool from "../config/Database.js";
import { uuidv7 } from "uuidv7";

/**
 * Get pengiriman data from the database.
 * @returns {Promise} Promise object represents the result of the query.
 */
export const getPengirimanModel = () => {
  const query = `
        SELECT 
            no_resi,
            uuid_user,
            nama_pengirim, p_pengirim.nama_provinsi AS p_pengirim, kk_pengirim.nama_kabupaten_kota AS kk_pengirim, kode_pos_pengirim, no_tlp_pengirim, 
            nama_penerima, p_penerima.nama_provinsi AS p_penerima, kk_penerima.nama_kabupaten_kota AS kk_penerima, kode_pos_penerima, no_tlp_penerima,
            nama_barang, jumlah_barang, berat, harga_pengiriman, tanggal, l.nama_layanan AS nama_layanan, deskripsi
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
    });
  });
};

export const getPengirimanByIdModel = (uuid_user) => {
  const query = `
        SELECT
            no_resi, 
            uuid_user,
            nama_pengirim, p_pengirim.nama_provinsi AS p_pengirim, kk_pengirim.nama_kabupaten_kota AS kk_pengirim, kode_pos_pengirim, no_tlp_pengirim, 
            nama_penerima, p_penerima.nama_provinsi AS p_penerima, kk_penerima.nama_kabupaten_kota AS kk_penerima, kode_pos_penerima, no_tlp_penerima,
            nama_barang, jumlah_barang, berat, harga_pengiriman, tanggal, l.nama_layanan AS nama_layanan, deskripsi
        FROM 
            pengiriman
        INNER JOIN provinsi AS p_pengirim ON p_pengirim.id_provinsi = pengiriman.id_provinsi_pengirim
        INNER JOIN provinsi AS p_penerima ON p_penerima.id_provinsi = pengiriman.id_provinsi_penerima
        INNER JOIN kabupaten_kota AS kk_pengirim ON kk_pengirim.id_kabupaten_kota = pengiriman.id_kabupaten_kota_pengirim
        INNER JOIN kabupaten_kota AS kk_penerima ON kk_penerima.id_kabupaten_kota = pengiriman.id_kabupaten_kota_penerima
        INNER JOIN layanan AS l ON (l.id_layanan = pengiriman.id_layanan)
        WHERE pengiriman.uuid_user = '${uuid_user}' AND pengiriman.deleted_date IS NULL; 
    `;
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, field) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const createPengirimanModel = (pengirimanData) => {
  const query = `
        INSERT INTO pengiriman (
            no_resi, uuid_user, id_kategori_barang, nama_pengirim, id_provinsi_pengirim, 
            id_kabupaten_kota_pengirim, kode_pos_pengirim, no_tlp_pengirim, 
            nama_penerima, id_provinsi_penerima, id_kabupaten_kota_penerima, 
            kode_pos_penerima, no_tlp_penerima, nama_barang, jumlah_barang, 
            berat, harga_pengiriman, tanggal, id_layanan, deskripsi, created_date, updated_date
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
    `;

  const no_resi = uuidv7();
  const values = [
    no_resi,
    pengirimanData.uuid_user,
    pengirimanData.id_kategori_barang,
    pengirimanData.nama_pengirim,
    pengirimanData.id_provinsi_pengirim,
    pengirimanData.id_kabupaten_kota_pengirim,
    pengirimanData.kode_pos_pengirim,
    pengirimanData.no_tlp_pengirim,
    pengirimanData.nama_penerima,
    pengirimanData.id_provinsi_penerima,
    pengirimanData.id_kabupaten_kota_penerima,
    pengirimanData.kode_pos_penerima,
    pengirimanData.no_tlp_penerima,
    pengirimanData.nama_barang,
    pengirimanData.jumlah_barang,
    pengirimanData.berat,
    pengirimanData.harga_pengiriman,
    pengirimanData.tanggal,
    pengirimanData.id_layanan,
    pengirimanData.deskripsi,
    pengirimanData.no_resi,
  ];

  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updatePengirimanModel = (pengirimanData) => {
  const query = `
        UPDATE pengiriman
        SET
            uuid_user = ?, 
            id_kategori_barang = ?, 
            nama_pengirim = ?, 
            id_provinsi_pengirim = ?, 
            id_kabupaten_kota_pengirim = ?, 
            kode_pos_pengirim = ?, 
            no_tlp_pengirim = ?, 
            nama_penerima = ?, 
            id_provinsi_penerima = ?, 
            id_kabupaten_kota_penerima = ?, 
            kode_pos_penerima = ?, 
            no_tlp_penerima = ?, 
            nama_barang = ?, 
            jumlah_barang = ?, 
            berat = ?, 
            harga_pengiriman = ?, 
            tanggal = ?, 
            id_layanan = ?, 
            deskripsi = ?,
            updated_date = CURRENT_TIMESTAMP
        WHERE
            no_resi = ?;
    `;
  console.log("No Resi:", pengirimanData.no_resi);
  const values = [
    pengirimanData.uuid_user,
    pengirimanData.id_kategori_barang,
    pengirimanData.nama_pengirim,
    pengirimanData.id_provinsi_pengirim,
    pengirimanData.id_kabupaten_kota_pengirim,
    pengirimanData.kode_pos_pengirim,
    pengirimanData.no_tlp_pengirim,
    pengirimanData.nama_penerima,
    pengirimanData.id_provinsi_penerima,
    pengirimanData.id_kabupaten_kota_penerima,
    pengirimanData.kode_pos_penerima,
    pengirimanData.no_tlp_penerima,
    pengirimanData.nama_barang,
    pengirimanData.jumlah_barang,
    pengirimanData.berat,
    pengirimanData.harga_pengiriman,
    pengirimanData.tanggal,
    pengirimanData.id_layanan,
    pengirimanData.deskripsi,
    pengirimanData.no_resi,
  ];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        console.log("RESULT:", results);
        resolve(results);
      }
    });
  });
};

// Get Provinsi
export const getProvinsiModel = () => {
  const query = `SELECT id_provinsi, nama_provinsi FROM provinsi;`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get Kabupaten/Kota
export const getKabupatenKotaModel = () => {
  const query = `SELECT id_kabupaten_kota, nama_kabupaten_kota FROM kabupaten_kota;`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
