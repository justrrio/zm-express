import express from 'express';
import { verifyUser, adminOnly } from '../middleware/AuthUserMiddleware.js';
import {
    getWarehouseController,
    getWarehouseByIdController,
    createWarehouseController,
    updateWarehouseController,
    deleteWarehouseController
} from '../controllers/WarehouseController.js';

const router = express.Router();

router.get('/warehouse', verifyUser, adminOnly, getWarehouseController);
router.get('/warehouse:id', verifyUser, adminOnly, getWarehouseByIdController);
router.post('/warehouse', verifyUser, adminOnly, createWarehouseController);
router.patch('/warehouse', verifyUser, adminOnly, updateWarehouseController);
router.delete('/warehouse', verifyUser, adminOnly, deleteWarehouseController);

export default router;