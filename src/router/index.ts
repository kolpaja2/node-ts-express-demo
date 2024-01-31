import express from 'express';
// import routes
import auth from './auth';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    // users routes
    users(router);
    // call all routes
    auth(router);
    return router;
};
