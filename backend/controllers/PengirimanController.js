import { getPengirimanModel, getPengirimanByIdModel } from "../models/PengirimanModel.js"

export const getPengirimanController = async (req, res, fields) => {
    try {
        let result = "";
        if (req.role === 'Admin') {
            result = await getPengirimanModel().catch((message) => {
                throw new Error(message);
            });
        } else {
            result = await getPengirimanByIdModel(req.session.uuid_user).catch((message) => {
                throw new Error(message);
            });            
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({errMessage: err.message});
    }
}

// export const getPengirimanByIdController = async (req, res, fields) => {
//     try {
//         const result = await getPengirimanByIdModel(req.session.userId).catch((message) => {
//             throw new Error(message);
//         });
//         res.status(200).json(result);
//     } catch(err) {
//         res.status(500).json({errMessage: err.message});
//     }
// }