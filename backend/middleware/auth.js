import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authMiddleware = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET || config.jwtSecret;
    
    try {
       
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

       
           const decoded = jwt.verify(token, JWT_SECRET)
      
        req.userId = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};