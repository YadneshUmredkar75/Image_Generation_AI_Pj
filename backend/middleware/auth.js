import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = async (req, res, next) => {
  try {
   
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    
    const decoded = verifyToken(token);

    
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};