import express from 'express';
import Router from '../../utils/Router';
import { list, create, edit, update, delete_data } from '../../controllers/Stock.controller';

const myRouter = new Router(express.Router());

myRouter.get('/list', list);
myRouter.post('/create', create);
myRouter.post('/update', update);
myRouter.post('/delete', delete_data);
myRouter.get('/:id', edit);

export default myRouter.router;
