import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../db/users/actions';
import { authentication, random } from '../utils/helpers';
import { COOKIE_AUTH } from '../utils/constants';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'email or password is missing',
            });
        }

        const user = await getUserByEmail(email).select(
            '+authentication.salt +authentication.password'
        );

        if (!user) {
            return res.status(400).json({
                message: 'user not found with this email: ' + email,
            });
        }
        const expectedHash = authentication(
            user.authentication?.salt as string,
            password
        );

        if (user!.authentication!.password !== expectedHash) {
            res.status(403).json({
                message: 'email or password does not match',
            });
        }
        const salt = random();

        user.authentication!.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        res.cookie(COOKIE_AUTH, user.authentication?.sessionToken, {
            domain: 'localhost',
            path: '/',
        });

        res.status(200).json(user).end();
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong while login',
        });
        console.log('🚀 ~ login ~ error:', error);
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        // check if missing field
        if (!email || !username || !password) {
            return res.status(400).json({
                message: 'email, username or password missing',
            });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email',
            });
        }
        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ registerUser ~ error:', error);
    }
};
