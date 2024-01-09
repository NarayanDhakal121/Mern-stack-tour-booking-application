import jwt from "jsonwebtoken";
import { parse } from "cookie";



// Middleware to verify a JWT token
export const verifyToken = (req, res, next) => {
    const cookies = parse(req.headers.cookie || ''); 
    const token = cookies.accessToken;
    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        req.user = user;
        next();
    });
};



// Middleware to verify if the user is authorized
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role !=='admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};

// Middleware to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }
 });
};
