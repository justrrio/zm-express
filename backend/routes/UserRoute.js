import express from "express";
import {
    getUsersController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController,
} from "../controllers/UserController.js"

const router = express.Router();

router.get("/users", getUsersController);
router.get("/users/:id", getUserByIdController);
router.post("/users", createUserController);
router.patch("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;