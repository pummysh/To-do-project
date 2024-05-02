import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

// Middleware function to authenticate user
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token from request headers
        const token = req.headers.authorization;

        // const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.SHH_KEY!);

        // Fetch user from database based on token payload
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({where : {id : decoded.id}});

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach user object to request for further use
        (req as any).user = user;

        // Continue to next middleware
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
