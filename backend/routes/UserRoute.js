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
router.get("/users/:id", verifyUser, adminOnly, getUserByIdController);
router.post("/users", verifyUser, adminOnly, createUserController);
router.patch("/users/:id", verifyUser, adminOnly, updateUserController);
router.delete("/users/:id", verifyUser, adminOnly, deleteUserController);

export default router;