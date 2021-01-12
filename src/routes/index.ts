import express from 'express';
import { UnauthorizedError as Jwt401Error } from 'express-jwt';
import Router from '../utils/Router';
import authRoute from './auth';
import userRoute from './user';
import lottoRoute from './lottotype';
import mysql from '../mysql';

import stock from './stock';
import authen from './authen';

const myRouter = new Router(express.Router());

myRouter.get('/ping', (req, { res }) => {
	res.status(200);
	res.end('pong');
});

myRouter.router.use('/api/v2/stock/', stock);
myRouter.router.use('/api/v2/authen/', authen);

myRouter.router.use('/auth', authRoute);
myRouter.router.use('/user', Router.decodeJwt, userRoute);
myRouter.router.use('/lotto_type', Router.decodeJwt, lottoRoute);

myRouter.get('/register', async ({ params, body }, { json, error }) => {
	const { username, password, name } = body;
	if (username && password && name) {
		const insert = await mysql.query('insert into users (username, password, name) VALUES (?, ?, ?)', [username, password, name]);
		json({ msg: 200, body });
	}
	return error('กรุณากรอกข้อมูลให้ครบ');
});

myRouter.post('/register', async ({ params, body }, { json, error }) => {
	const { username, password, name } = body;
	if (username && password && name) {
		const insert = await mysql.query('insert into users (username, password, name) VALUES (?, ?, ?)', [username, password, name]);
		json({ msg: 200, body });
	}
	return error('กรุณากรอกข้อมูลให้ครบ');
});

// Global Error handler
myRouter.error((err: Error, req, { clearCookie, error }) => {
	if (err instanceof Jwt401Error) {
		// clearCookie(config.jwtCookieName);
		return error('กรุณาเข้าสู่ระบบ !!!', 403);
	}
	console.error('Internal Server Error', err);
	return error('พบข้อผิดพลาด ไม่สามารถดำเนินการได้', 500);
});

export default myRouter.router;
