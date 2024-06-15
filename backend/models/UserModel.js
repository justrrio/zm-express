import pool from "../config/Database.js";
import { uuidv7 } from "uuidv7";

export const getUsersModel = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT uuid_user, email, nama_lengkap, no_tlp, role FROM users WHERE deleted_date IS NULL",
      (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export const getUserByIdModel = (uuid_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT uuid_user, email, nama_lengkap, no_tlp, role FROM users WHERE uuid_user=? AND deleted_date IS NULL",
      [uuid_user],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const getUserByEmailModel = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT uuid_user, email, nama_lengkap, no_tlp, role FROM users WHERE email=? AND deleted_date IS NULL",
      [email],
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const createUserModel = (data) => {
  const query = `INSERT INTO users(uuid_user, email, nama_lengkap, password, no_tlp, role, created_date, updated_date) VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;

  const uuidUser = uuidv7();
  const values = [
    uuidUser,
    data.emailUser,
    data.namaUser,
    data.hashedPasswordUser,
    data.noTlpUser,
    data.roleUser,
  ];
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateUserModel = (
  uuid_user,
  name,
  email,
  hashedPassword,
  phoneNumber
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET email=?, nama_lengkap=?, password=?, no_tlp=?, updated_by=CURRENT_TIMESTAMP where uuid_user=?",
      [email, name, hashedPassword, phoneNumber, uuid_user],
      (err, result, fields) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const deleteUserModel = async (uuid_user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET deleted_date=CURRENT_TIMESTAMP WHERE uuid_user=?",
      [uuid_user],
      (err, result, fields) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      }
    );
  });
};
