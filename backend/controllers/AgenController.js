import {
  getAgenModel,
  getAgenByIdModel,
  createAgenModel,
  updateAgenModel,
  deleteAgenModel,
} from "../models/AgenModel.js";

export const getAgenController = async (req, res) => {
  try {
    const results = await getAgenModel().catch((message) => {
      throw new Error(message);
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const getAgenByIdController = async (req, res) => {
  const { uuid_agen } = req.params;

  try {
    const results = await getAgenByIdModel(uuid_agen).catch((message) => {
      throw new Error(message);
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const createAgenController = async (req, res) => {
  const data = {
    namaAgen: req.body.namaAgen,
    idProvinsiAgen: req.body.idProvinsiAgen,
    idKabupatenKotaAgen: req.body.idKabupatenKotaAgen,
    alamatAgen: req.body.alamatAgen,
  };

  console.log("KABUSKSDF", data.idKabupatenKotaAgen);

  try {
    const results = await createAgenModel(data).catch((message) => {
      throw new Error(message);
    });

    res.status(200).json({ message: "Data agen berhasil dibuat!" });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const updateAgenController = async (req, res) => {
  const { uuid_agen } = req.params;

  const data = {
    uuid_agen: uuid_agen,
    nama_agen: req.body.nama_agen,
    id_provinsi_agen: req.body.id_provinsi_agen,
    id_kabupaten_kota_agen: req.body.id_kabupaten_kota_agen,
    alamat_agen: req.body.alamat_agen,
  };

  try {
    const results = await updateAgenModel(data).catch((message) => {
      throw new Error(message);
    });

    // Cek data di dalam database
    if (Array.isArray(results) && results.length === 0) {
      return res.status(400).json({ message: "Data agen tidak ditemukan!" });
    }

    res.status(200).json({ message: "Data agen berhasil diupdate!" });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};

export const deleteAgenController = async (req, res) => {
  try {
    const { uuid_agen } = req.params;

    // Validasi, apakah user sudah ada di database atau belum
    const responseGetAgenById = await getAgenByIdModel(uuid_agen).catch(
      (message) => {
        throw new Error(message);
      }
    );

    // Cek data di dalam database
    if (
      Array.isArray(responseGetAgenById) &&
      responseGetAgenById.length === 0
    ) {
      return res.status(400).json({ message: "Data agen tidak ditemukan!" });
    }

    const responseDelete = await deleteAgenModel(uuid_agen).catch((message) => {
      throw new Error(message);
    });
    res.status(200).json({ message: "Data agen berhasil dihapus!" });
  } catch (error) {
    res.status(400).json({ errorMessage: error.message });
  }
};
