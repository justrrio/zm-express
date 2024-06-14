import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUserMiddleware.js";
import {
  getPengirimanController,
  getPengirimanByIdController,
  createPengirimanController,
  updatePengirimanController,
  deletePengirimanController,
  getProvinsiController,
  getKabupatenKotaController,
} from "../controllers/PengirimanController.js";
const router = express.Router();

router.get("/pengiriman", verifyUser, getPengirimanController);
router.get("/pengiriman/:no_resi", verifyUser, getPengirimanByIdController);
router.post("/pengiriman", verifyUser, createPengirimanController);
router.patch("/pengiriman/:no_resi", verifyUser, updatePengirimanController);
router.delete(
  "/pengiriman/:no_resi",
  verifyUser,
  adminOnly,
  deletePengirimanController
);

router.get("/provinsi", verifyUser, getProvinsiController);
router.get("/kabupaten-kota", verifyUser, getKabupatenKotaController);

export default router;
