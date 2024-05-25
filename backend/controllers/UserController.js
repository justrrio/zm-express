import argon2 from 'argon2';
import { 
    getUsersModel,
    getUserByIdModel,
    createUserModel,
    updateUserModel,
    deleteUserModel,
} from "../models/UserModel.js";

export const getUsersController = async (req, res) => {
    try {
        const response = await getUsersModel().catch((message) => {
            throw new Error(message);
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validasi, apakah user sudah ada di database atau belum
        const response = await getUserByIdModel(id).catch((message) => {
            throw new Error(message);
        });

        if (Array.isArray(response) && response.length === 0) {
            return res.status(400).json({message: "Akun tidak ditemukan!"});
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
}

export const createUserController = async (req, res) => {
    const {name, email, password, confirmPassword, phoneNumber, role} = req.body;

    // Validasi nama
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ message: "Nama tidak valid!" });
    }

    // Validasi password dan confirm password
    if (password !== confirmPassword) return res.status(400).json({message: "Password dan Confirm Password tidak sesuai!"});
    const hashedPassword = await argon2.hash(password);

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({message: "Email tidak valid!"});

    // Validasi format nomor telepon
    const phoneRegex = /^(\+62|0)8[1-9][0-9]{6,11}$/;
    if (!phoneRegex.test(phoneNumber)) return res.status(400).json({message: "Nomor telepon tidak valid!"});

    try {
        const response = await createUserModel(name, email, hashedPassword, phoneNumber, role).catch((message) => {
            throw new Error(message);
        });
        res.status(200).json({message: "Akun telah berhasil dibuat!"});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validasi, apakah user sudah ada di database atau belum
        const responseGetUserById = await getUserByIdModel(id).catch((message) => {
            throw new Error(message);
        });
        if (Array.isArray(responseGetUserById) && responseGetUserById.length === 0) {
            return res.status(400).json({message: "Akun tidak ditemukan!"});
        }

        const {name, email, password, confirmPassword, phoneNumber, role} = req.body;
    
        // Validasi nama
        const nameRegex = /^[a-zA-Z\s.'-]+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Nama tidak valid!" });
        }

        let hashedPassword = ""
        // Validasi password dan confirm password
        if (password === "" || password === null) {
            hashedPassword = password 
        } else {
            hashedPassword = await argon2.hash(password);
        }
        if (password !== confirmPassword) return res.status(400).json({message: "Password dan Confirm Password tidak sesuai!"});

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({message: "Email tidak valid!"});

        // Validasi format nomor telepon
        const phoneRegex = /^(\+62|0)8[1-9][0-9]{6,11}$/;
        if (!phoneRegex.test(phoneNumber)) return res.status(400).json({message: "Nomor telepon tidak valid!"});

        const response = await updateUserModel(id, name, email, hashedPassword, phoneNumber, role).catch((message) => { throw new Error(message)});
        res.status(200).json({message: "Akun telah berhasil diupdate!"});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validasi, apakah user sudah ada di database atau belum
        const responseGetUserById = await getUserByIdModel(id).catch((message) => {
            throw new Error(message);
        });
        if (Array.isArray(responseGetUserById) && responseGetUserById.length === 0) {
            return res.status(400).json({message: "Akun tidak ditemukan!"});
        }

        const responseDelete = await deleteUserModel(id).catch((message) => {
            throw new Error(message);
        });
        res.status(200).json({message: "Akun telah berhasil dihapus!"});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}