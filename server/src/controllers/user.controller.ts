import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.modal';
import Zod from 'zod';
import Jwt from 'jsonwebtoken';

// Define a Zod schema for user creation validation 
const createUserSchema = Zod.object({
    username: Zod.string().min(3, 'Username must be at least 3 characters long'),
    email: Zod.string().email('Invalid email address'),
    password: Zod.string().min(6, 'Password must be at least 6 characters long'),
});




export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = createUserSchema.parse(req.body);

        const validate= {username,email,password};

        if (!validate) {
            return res.status(400).json({ message: 'username, email and password are required' });
        }
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        if (!newUser) {
            return res.status(400).json({ message: 'User creation failed' });
        }

        return res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (error) {
        console.error('createUser error:', error);
        const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
        return res.status(500).json({ message: 'Error creating user', error: errMessage });
    }
};

export const UserLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'JWT secret is not configured' });
        }
        const accessToken = Jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
        return res.status(200).json({ message: 'Login successful 🤝' });
    } catch (error) {
        console.error('Login error:', error);
        const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
        return res.status(500).json({ message: 'Error logging in', error: errMessage });
    }
}