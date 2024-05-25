import express from "express";
import {
    getUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from "../controllers/UserController.js"

const router = express.Router();

router.get("/users", getUsersController);
router.get("/user/:id", getUserByIdController);

export default router;