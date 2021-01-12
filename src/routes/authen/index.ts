import express from 'express';
import Router from '../../utils/Router';
import { login, create, edit, update, delete_data } from '../../controllers/Authen.controller';

const myRouter = new Router(express.Router());

myRouter.post('/login', login);
myRouter.post('/register', create);
myRouter.post('/update', update);
myRouter.post('/delete', delete_data);
myRouter.get('/:id', edit);

export default myRouter.router;
