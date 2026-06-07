import User, { IUser } from '../models/user.model';

import { IAuthPayload } from '../interfaces/auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthService = {
    async registerUser(userData: Partial<IUser>) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Email is already in use');
        }

        const newUser = await User.create(userData);
        const payload: IAuthPayload = {
            id: newUser._id.toString(),
            email: newUser.email,
        };
        const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: '1d' });
        return { token, user: newUser };


    },


    async loginUser(email: string, password: string) { 
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const payload: IAuthPayload = {
            id: user._id.toString(),
            email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: '1d' });
        return { token, user };
    }
}