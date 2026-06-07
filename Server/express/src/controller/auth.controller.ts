import { Request, Response } from 'express';

import { AuthService } from './../services/auth.service';

export const AuthController = {
    async register(req: Request, res: Response) { 
        try {
            const result = await AuthService.registerUser(req.body);
            res.status(201).json({message: 'User registered successfully', ...result});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
         }
    },
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.loginUser(email, password);
            res.status(200).json({ message: 'Login successful', ...result });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
         }
    }
}