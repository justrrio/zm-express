import { 
    getUsersModel,
    getUserByIdModel, 
} from "../models/UserModel.js";

export const getUsersController = async (req, res) => {
    try {
        const response = await getUsersModel();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await getUserByIdModel(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createUserController = (req, res) => {
    
}

export const updateUserController = (req, res) => {
    
}

export const deleteUserController = (req, res) => {
    
}