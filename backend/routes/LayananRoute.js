import express from 'express';
import { verifyUser, adminOnly } from '../middleware/AuthUserMiddleware.js';

import {
    getLayananController,
    getLayananByIdController,
    createLayananController,
    updateLayananController,
    deleteLayananController,
} from '../controllers/LayananController.js';

const router = express.Router();

router.get('/layanan', verifyUser, getLayananController);
router.get('/layanan:id', verifyUser, getLayananByIdController);
router.post('/layanan', verifyUser, adminOnly, createLayananController);
router.patch('/layanan:id', verifyUser, adminOnly, updateLayananController);
router.delete('/layanan:id', verifyUser, adminOnly, deleteLayananController);

export default router;