
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}