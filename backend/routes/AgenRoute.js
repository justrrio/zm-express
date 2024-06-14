import express from 'express';
import { verifyUser, adminOnly } from '../middleware/AuthUserMiddleware.js';
import {
    getAgenController,
    getAgenByIdController,
    createAgenController,
    updateAgenController,
    deleteAgenController
} from '../controllers/AgenController.js';

const router = express.Router();

router.get('/agen', verifyUser, adminOnly, getAgenController);
router.get('/agen/:uuid_agen', verifyUser, adminOnly, getAgenByIdController);
router.post('/agen', verifyUser, adminOnly, createAgenController);
router.patch('/agen/:uuid_agen', verifyUser, adminOnly, updateAgenController);
router.delete('/agen/:uuid_agen', verifyUser, adminOnly, deleteAgenController);

export default router;