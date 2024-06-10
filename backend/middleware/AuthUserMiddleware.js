// Middleware untuk memproteksi endpoint

import { getUserByIdModel } from "../models/UserModel.js";

// Verifikasi dan validasi user 
export const verifyUser = async (req, res, next) => {
    try {
        // Cek session
        if (!req.session.userId) return res.status(400).json({message: "Mohon login ke akun Anda!"});
    
        console.log("SESSION:", req.session.userId);
    
        // Cek data di database
        const response = await getUserByIdModel(req.session.userId).catch((message) => {
            throw new Error(message);
        });
        
        // Buat variable yang akan digunakan nanti
        req.userId = response[0].id;
        req.role = response[0].role;
    
        next();

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const adminOnly = async (req, res, next) => {
    // Disini menggunakan req.session.userId bukan req.userId agar dapat verifikasi user berdasarkan session
    try {
        const isAdmin = await getUserByIdModel(req.session.userId);
        if (isAdmin[0].role !== "Admin") return res.status(403).json({message: "Akses terlarang. Anda harus login sebagai Admin!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    next();
}