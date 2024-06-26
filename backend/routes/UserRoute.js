import express from "express";
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/UserController.js";

// Verifikasi akun user
import { verifyUser, adminOnly } from "../middleware/AuthUserMiddleware.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsersController);
router.get("/users/:uuid_user", verifyUser, adminOnly, getUserByIdController);
router.post("/users", verifyUser, adminOnly, createUserController);
router.patch("/users/:uuid_user", verifyUser, adminOnly, updateUserController);
router.delete("/users/:uuid_user", verifyUser, adminOnly, deleteUserController);

export default router;
