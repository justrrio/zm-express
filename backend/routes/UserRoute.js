import express from "express";
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/UserController"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Home PAGEEEEEEEE</h1>")
})

export default router;