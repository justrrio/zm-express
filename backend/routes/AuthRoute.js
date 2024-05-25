import express from "express";
import {
    Login,
    getLoginInfo,
    logOut,
} from "../controllers/AuthController.js";

const router = express.Router();

router.get("/me", getLoginInfo);
router.post("/login", Login);
router.delete("/logout", logOut);

export default router;