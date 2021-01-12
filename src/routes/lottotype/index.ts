import express from 'express';
import Router from '../../utils/Router';
import { list, create, update, delete_data } from '../../controllers/Lottotype.controller';

const myRouter = new Router(express.Router());

myRouter.post('/list', list);
myRouter.post('/create', create);
myRouter.post('/update', update);
myRouter.post('/delete', delete_data);

export default myRouter.router;
