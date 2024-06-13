import express from 'express';
import { verifyUser } from '../middleware/AuthUserMiddleware.js';
import { 
    getPengirimanController, 
    getPengirimanByIdController,
    createPengirimanController,
    updatePengirimanController,
    getProvinsiController,
    getKabupatenKotaController,
    getLayananController,
} from '../controllers/PengirimanController.js';
const router = express.Router();

router.get('/pengiriman', verifyUser, getPengirimanController);
router.get('/pengiriman:id', verifyUser, getPengirimanByIdController);
router.post('/pengiriman', verifyUser, createPengirimanController);
router.patch('/pengiriman', verifyUser, updatePengirimanController)

router.get('/provinsi', verifyUser, getProvinsiController)
router.get('/kabupaten-kota', verifyUser, getKabupatenKotaController)

router.get('/layanan', verifyUser, getLayananController);

export default router;