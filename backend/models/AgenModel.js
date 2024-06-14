import pool from "../config/Database.js";
import { uuidv7 } from "uuidv7";

export const getAgenModel = () => {
  const query = `
        SELECT 
            uuid_agen, nama_agen, p.nama_provinsi AS provinsi_agen, kk.nama_kabupaten_kota AS kabupaten_kota_agen, alamat_agen
        FROM agen 
        INNER JOIN provinsi AS p ON p.id_provinsi = agen.id_provinsi_agen
        INNER JOIN kabupaten_kota AS kk ON kk.id_kabupaten_kota = agen.id_kabupaten_kota_agen
        WHERE agen.deleted_date IS NULL;
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

export const getAgenByIdModel = (uuid_agen) => {
  const query = `
        SELECT 
            uuid_agen, nama_agen, p.nama_provinsi AS provinsi_agen, kk.nama_kabupaten_kota AS kabupaten_kota_agen, alamat_agen
        FROM agen 
        INNER JOIN provinsi AS p ON p.id_provinsi = agen.id_provinsi_agen
        INNER JOIN kabupaten_kota AS kk ON kk.id_kabupaten_kota = agen.id_kabupaten_kota_agen
        WHERE agen.uuid_agen = ? AND agen.deleted_date IS NULL;
    `;

  return new Promise((resolve, reject) => {
    pool.query(query, [uuid_agen], (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const createAgenModel = (data) => {
  const query = `INSERT INTO agen(uuid_agen, nama_agen, id_provinsi_agen, id_kabupaten_kota_agen, alamat_agen, created_date, updated_date) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

  const uuid_agen = uuidv7();

  const values = [
    uuid_agen,
    data.nama_agen,
    data.id_provinsi_agen,
    data.id_kabupaten_kota_agen,
    data.alamat_agen,
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

export const updateAgenModel = (data) => {
  const query = `UPDATE agen SET nama_agen=?, id_provinsi_agen=?, id_kabupaten_kota_agen=?, alamat_agen=?, updated_date=CURRENT_TIMESTAMP WHERE uuid_agen=? AND deleted_date IS NULL;`;

  const values = [
    data.nama_agen,
    data.id_provinsi_agen,
    data.id_kabupaten_kota_agen,
    data.alamat_agen,
    data.uuid_agen,
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

export const deleteAgenModel = async (uuid_agen) => {
  const query = `UPDATE agen SET deleted_date=CURRENT_TIMESTAMP WHERE uuid_agen=?`;
  return new Promise((resolve, reject) => {
    pool.query(query, [uuid_agen], (err, result, fields) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result);
      }
    });
  });
};
