import express from 'express';
import Router from '../../utils/Router';

import { login, logout, me } from '../../controllers/Auth.controller';

const myRouter = new Router(express.Router());

myRouter.post('/login', login);
myRouter.router.use('/logout', Router.decodeJwt);
myRouter.post('/logout', logout);
myRouter.router.use('/me', Router.decodeJwt);
myRouter.get('/me', me);

export default myRouter.router;
