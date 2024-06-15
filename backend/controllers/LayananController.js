import {
  getLayananModel,
  getLayananByIdModel,
  createLayananModel,
  updateLayananModel,
  deleteLayananModel,
} from "../models/LayananModel.js";

export const getLayananController = async (req, res) => {
  try {
    const results = await getLayananModel().catch((message) => {
      throw new Error(message);
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const getLayananByIdController = async (req, res) => {
  const { id_layanan } = req.params;

  try {
    const results = await getLayananByIdModel(id_layanan).catch((message) => {
      throw new Error(message);
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const createLayananController = async (req, res) => {
  const data = {
    namaLayanan: req.body.namaLayanan,
    hargaLayanan: req.body.hargaLayanan,
  };

  try {
    const results = await createLayananModel(data).catch((message) => {
      throw new Error(message);
    });

    res.status(200).json({ message: "Layanan baru berhasil dibuat!" });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const updateLayananController = async (req, res) => {
  const data = {
    id_layanan: req.body.id_layanan,
    nama_layanan: req.body.nama_layanan,
    harga_layanan: req.body.harga_layanan,
  };

  try {
    const results = await updateLayananModel(data).catch((message) => {
      throw new Error(message);
    });

    if (Array.isArray(results) && results.length === 0) {
      return res
        .status(400)
        .json({ message: "Data warehouse tidak ditemukan!" });
    }

    res.status(200).json({ message: "Data agen berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const deleteLayananController = async (req, res) => {
  try {
    const { id_layanan } = req.params;

    // Validasi, apakah user sudah ada di database atau belum
    const responseGetLayananById = await getLayananByIdModel(id_layanan).catch(
      (message) => {
        throw new Error(message);
      }
    );
    if (
      Array.isArray(responseGetLayananById) &&
      responseGetLayananById.length === 0
    ) {
      return res.status(400).json({ message: "Layanan tidak ditemukan!" });
    }

    const responseDelete = await deleteLayananModel(id_layanan).catch(
      (message) => {
        throw new Error(message);
      }
    );
    res.status(200).json({ message: "Layanan berhasil dihapus!" });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
