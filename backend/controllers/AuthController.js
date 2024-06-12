import { 
    getUserByEmailModel, 
    getUserByIdModel,
} from "../models/UserModel.js";
import argon2 from 'argon2';
import { uuidv7 } from 'uuidv7';


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Format email tidak sesuai!"});
        }
        
        // Cek email di database
        const responseGetUserByEmail = await getUserByEmailModel(email).catch((message) => {
            throw new Error(message);
        });
        // kirim pesan jika email tidak terdaftar 
        if (Array.isArray(responseGetUserByEmail) && responseGetUserByEmail.length === 0) {
            return res.status(404).json({message: "Email tidak terdaftar"});
        }
        
        // Validasi password
        const userPassword = responseGetUserByEmail[0].password;
        const match = await argon2.verify(userPassword, password);
        if(!match) return res.status(400).json({message: "Password tidak sesuai!"}); 
        
        // Set session
        req.session.uuid_user = responseGetUserByEmail[0].uuid_user;
        const uuid_user = responseGetUserByEmail[0].uuid_user;
        const name = responseGetUserByEmail[0].nama_lengkap;
        const role = responseGetUserByEmail[0].role;

        res.status(200).json({uuid_user, name, email, role});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}

export const Me = async (req, res) => {
    try {
        // Cek session
        if (!req.session.uuid_user) return res.status(400).json({message: "Mohon login ke akun Anda!"});

        console.log("SESSION:", req.session.uuid_user);

        // Cek apakah user terdaftar di database
        const response = await getUserByIdModel(req.session.uuid_user).catch((message) => {
            throw new Error(message);
        });
        
        const uuid_user = response[0].uuid_user;
        const email = response[0].email;
        const name = response[0].nama_lengkap;
        const phoneNumber = response[0].no_tlp;
        const role = response[0].role;

        res.status(200).json({uuid_user, email, name, phoneNumber, role});
    } catch (error) {
        res.status(400).json({errorMessage: error.message});
    }
}

export const logOut = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({errorMessage: "Tidak dapat logout!"});

        res.status(200).json({message: "Berhasil logout!"});
    })
}