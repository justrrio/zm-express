import {
    getAgenModel,
    getAgenByIdModel,
    createAgenModel,
    updateAgenModel,
    deleteAgenModel,
} from '../models/AgenModel.js';

export const getAgenController = async (req, res) => {
    try {
        const results = await getAgenModel();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageAgen: err.message});
    }
}

export const getAgenByIdController = async (req, res) => {
    const { uuid_warehouse } = req.params;

    try {
        const results = await getAgenByIdModel(uuid_warehouse);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageAgen: err.message});
    }
}

export const createAgenController = async (req, res) => {
    const data = {
        nama_agen: req.body.nama_agen,
        alamat_agen: req.body.alamat_agen,
    }

    try {
        const results = await createAgenModel(data);
        res.status(200).json({message: "Tempat agen baru telah berhasil dibuat!"});
    } catch (err) {
        res.status(500).json({errMessageAgen: err.message});
    }
}

export const updateAgenController = async (req, res) => {
    const data = {
        uuid_agen: req.body.uuid_agen,
        nama_agen: req.body.nama_agen,
        alamat_agen: req.body.alamat_agen,
    }

    try {
        const results = await updateAgenModel(data);
        res.status(200).json({message: "Data agen telah berhasil diupdate!"});
    } catch (err) {
        res.status(500).json({errMessageAgen: err.message});
    }
}

export const deleteAgenController = async (req, res) => {
    try {
        const { uuid_agen } = req.params;

        // Validasi, apakah user sudah ada di database atau belum
        const responseGetAgenById = await getAgenByIdModel(uuid_agen).catch((message) => {
            throw new Error(message);
        });
        if (Array.isArray(responseGetAgenById) && responseGetAgenById.length === 0) {
            return res.status(400).json({message: "Agen tidak ditemukan!"});
        }

        const responseDelete = await deleteAgenModel(uuid_agen).catch((message) => {
            throw new Error(message);
        });
        res.status(200).json({message: "Tempat agen telah berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}