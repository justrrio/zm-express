import { getUserByIdModel } from "../models/UserModel";

export const verifyUser = async (req, res, next) => {
    
}

export const adminOnly = async (req, res, next) => {
    try {
        const isAdmin = await getUserByIdModel(req.session.userId);
        if (isAdmin.role !== "Admin") return res.status(403).json({message: "Akses terlarang. Anda harus login sebagai Admin!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    next();
}