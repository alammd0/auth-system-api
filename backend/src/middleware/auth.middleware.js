
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }
    catch (error) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }
}

export const authUser = (req, res, next) => {
    try {

        if(req.user.role  === "User") {
            next();
        } else{
            return res.status(401).json({
                message: "You are not authorized to access this route"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }
}

export const adminUser = (req, res, next) => {
    
    try {
        if(req.user.role  === "Admin") {
            next();
        } else{
            return res.status(401).json({
                message: "You are not authorized to access this route"
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "You are not authorized to access this route"
        });
    }
}