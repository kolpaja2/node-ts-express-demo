import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthed, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthed, getAllUsers);
    router.delete('/users/:id', isAuthed, isOwner, deleteUser);
    router.put('/users/:id', isAuthed, isOwner, updateUser);
};
