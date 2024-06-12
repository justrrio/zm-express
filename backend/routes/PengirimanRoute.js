import express from 'express';
import { verifyUser } from '../middleware/AuthUserMiddleware.js';
import { getPengirimanController } from '../controllers/PengirimanController.js';

const router = express.Router();

router.get('/pengiriman', verifyUser, getPengirimanController);
// router.get('/pengiriman:id', getPengirimanByIdController);

export default router;