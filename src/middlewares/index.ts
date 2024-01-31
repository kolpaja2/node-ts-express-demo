import { NextFunction, Request, Response } from 'express';
import { COOKIE_AUTH } from '../utils/constants';
import { getUserBySessionToken } from '../db/users/actions';
import _ from 'lodash';

export const isOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        const currentUserId = String(_.get(req, 'identity._id'));

        if (!currentUserId) return res.sendStatus(400);

        if (currentUserId !== id) {
            return res.sendStatus(401);
        }

        next();
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ error:', error);
    }
};

export const isAuthed = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessionToken = req.cookies[COOKIE_AUTH];
        if (!sessionToken) return res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) return res.sendStatus(403);

        _.merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        res.sendStatus(400);
        console.log('🚀 ~ isAuthed ~ error:', error);
    }
};
