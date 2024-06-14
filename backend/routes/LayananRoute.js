import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUserMiddleware.js";

import {
  getLayananController,
  getLayananByIdController,
  createLayananController,
  updateLayananController,
  deleteLayananController,
} from "../controllers/LayananController.js";

const router = express.Router();

router.get("/layanan", verifyUser, getLayananController);
router.get("/layanan/:id_layanan", verifyUser, getLayananByIdController);
router.post("/layanan", verifyUser, adminOnly, createLayananController);
router.patch(
  "/layanan/:id_layanan",
  verifyUser,
  adminOnly,
  updateLayananController
);
router.delete(
  "/layanan/:id_layanan",
  verifyUser,
  adminOnly,
  deleteLayananController
);

export default router;
