import express from 'express';
import { verifyUser, adminOnly } from '../middleware/AuthUserMiddleware.js';

import {
    getKategoriBarangController,
    getKategoriBarangByIdController,
    createKategoriBarangController,
    updateKategoriBarangController,
    deleteKategoriBarangController,
} from '../controllers/KategoriBarangController.js';

const router = express.Router();

router.get('/kategori-barang', verifyUser, getKategoriBarangController);
router.get('/kategori-barang:id', verifyUser, getKategoriBarangByIdController);
router.post('/kategori-barang', verifyUser, createKategoriBarangController);
router.patch('/kategori-barang:id', verifyUser, updateKategoriBarangController);
router.delete('/kategori-barang:id', verifyUser, deleteKategoriBarangController);

export default router;