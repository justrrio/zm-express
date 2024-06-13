import {
    getWarehouseModel,
    getWarehouseByIdModel,
    createWarehouseModel,
    updateWarehouseModel,
    deleteWarehouseModel,
} from '../models/WarehouseModel.js';

export const getWarehouseController = async (req, res) => {
    try {
        const results = await getWarehouseModel();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageWarehouse: err.message});
    }
}

export const getWarehouseByIdController = async (req, res) => {
    const { uuid_warehouse } = req.params;

    try {
        const results = await getWarehouseByIdModel(uuid_warehouse);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({errMessageWarehouse: err.message});
    }
}

export const createWarehouseController = async (req, res) => {
    const data = {
        nama_warehouse: req.body.nama_warehouse,
        alamat_warehouse: req.body.alamat_warehouse,
    }

    try {
        const results = await createWarehouseModel(data);
        res.status(200).json({message: "Tempat warehouse baru telah berhasil dibuat!"});
    } catch (err) {
        res.status(500).json({errMessageWarehouse: err.message});
    }
}

export const updateWarehouseController = async (req, res) => {
    const data = {
        uuid_warehouse: req.body.uuid_warehouse,
        nama_warehouse: req.body.nama_warehouse,
        alamat_warehouse: req.body.alamat_warehouse,
    }

    try {
        const results = await updateWarehouseModel(data);
        res.status(200).json({message: "Data warehouse telah berhasil diupdate!"});
    } catch (err) {
        res.status(500).json({errMessageWarehouse: err.message});
    }
}

export const deleteWarehouseController = async (req, res) => {
    try {
        const { uuid_warehouse } = req.params;

        // Validasi, apakah user sudah ada di database atau belum
        const responseGetWarehouseById = await getWarehouseByIdModel(uuid_warehouse).catch((message) => {
            throw new Error(message);
        });
        if (Array.isArray(responseGetWarehouseById) && responseGetWarehouseById.length === 0) {
            return res.status(400).json({message: "Tempat warehouse tidak ditemukan!"});
        }

        const responseDelete = await deleteWarehouseModel(uuid_warehouse).catch((message) => {
            throw new Error(message);
        });
        res.status(200).json({message: "Tempat warehouse telah berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}