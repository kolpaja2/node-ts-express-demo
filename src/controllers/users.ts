import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users/actions';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ getAllUsers ~ error:', error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        if (!deleteUser) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        return res.status(200).json({
            message: 'user deleted',
            user: deletedUser,
        });
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ deleteUser ~ error:', error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { username } = req.body;
        if (!username) {
            return res.status(400).json({
                message: 'missing username',
            });
        }

        const user = await getUserById(id);

        user!.username = username;
        await user?.save();

        res.status(200).json(user);
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ deleteUser ~ error:', error);
    }
};
