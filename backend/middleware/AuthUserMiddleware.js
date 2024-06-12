// Middleware untuk memproteksi endpoint

import { getUserByIdModel } from "../models/UserModel.js";

// Verifikasi dan validasi user 
export const verifyUser = async (req, res, next) => {
    try {
        // Cek session
        if (!req.session.uuid_user) return res.status(400).json({message: "Mohon login ke akun Anda!"});
        
        // Cek data di database
        const result = await getUserByIdModel(req.session.uuid_user).catch((message) => {
            throw new Error(message);
        });
        
        // Buat variable yang akan digunakan nanti
        req.uuid_user = result[0].uuid_user;
        req.uuid = result[0].uuid;
        req.role = result[0].role;
        
        next();

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const adminOnly = async (req, res, next) => {
    // Disini menggunakan req.session.userId bukan req.userId agar dapat verifikasi user berdasarkan session
    try {
        const isAdmin = await getUserByIdModel(req.session.uuid_user);
        if (isAdmin[0].role !== "Admin") return res.status(403).json({message: "Akses terlarang. Anda harus login sebagai Admin!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    next();
}