import {
    getKategoriBarangModel,
    getKategoriBarangByIdModel,
    createKategoriBarangModel,
    updateKategoriBarangModel,
    deleteKategoriBarangModel,
} from '../models/KategoriBarangModel.js';

export const getKategoriBarangController = async (req, res) => {
    try {
        const results = await getKategoriBarangModel().catch((message) => {
            throw new Error(message);
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageKategoriBarang: err.message});
    }
}

export const getKategoriBarangByIdController = async (req, res) => {
    const { id_kategori_barang } = req.params;

    try {
        const results = await getKategoriBarangByIdModel(id_kategori_barang).catch((message) => {
            throw new Error(message);
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageKategoriBarang: err.message});
    }
}

export const createKategoriBarangController = async (req, res) => {
    const data = {
        nama_kategori_barang: req.body.nama_kategori_barang,
    }

    try {
        const results = await createKategoriBarangModel(data).catch((message) => {
            throw new Error(message);
        });

        res.status(200).json({message: "Kategori baru berhasil dibuat!"});
    } catch (err) {
        res.status(500).json({errMessageKategoriBarang: err.message});
    }
}

export const updateKategoriBarangController = async (req, res) => {
    const data = {
        nama_kategori_barang: req.body.nama_kategori_barang,
    }

    try {
        const results = await updateKategoriBarangModel(data).catch((message) => {
            throw new Error(message);
        });
        if (Array.isArray(results) && results.length === 0) {
            return res.status(400).json({message: "Data warehouse tidak ditemukan!"});
        }

        res.status(200).json({message: "Kategori berhasil diupdate!"});
    } catch (err) {
        res.status(500).json({errMessageKategoriBarang: err.message});
    }
}

export const deleteKategoriBarangController = async (req, res) => {
    try {
        const { id_kategori_barang } = req.params;

        // Validasi, apakah user sudah ada di database atau belum
        const responseGetKategoriBarangById = await getKategoriBarangByIdModel(id_kategori_barang).catch((message) => {
            throw new Error(message);
        });

        if (Array.isArray(responseGetKategoriBarangById) && responseGetKategoriBarangById.length === 0) {
            return res.status(400).json({message: "Kategori tidak ditemukan!"});
        }

        const responseDelete = await deleteKategoriBarangModel(id_kategori_barang).catch((message) => {
            throw new Error(message);
        });
        res.status(200).json({message: "Kategori berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({errMessageKategoriBarang: error.message});
    }
}