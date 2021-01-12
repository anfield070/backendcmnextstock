import jwt from 'jsonwebtoken';
import { config } from '../config';
import mysql from '../mysql';

export const login = async ({ body }, { json, error, setCookie }) => {
	if (!body) {
		return error('กรุณากรอกข้อมุลให้ครบ');
	}

	const { username, password } = body;

	if (!(username && password)) {
		return error('ไม่พบข้อมูลผู้ใช้');
	}

	// ใช้ username and password ดึงข้อมูลเช็ตจาก DB
	const [me] = await mysql.query('select * from users where username = ? and password = ?', [username, password]);

	if (me && username === me.username && password === me.password) {
		const cookieExpireIn = 60 * 60 * 48; // 3 hours เวลาที่ login jwt cookie จะหมดอายุ

		// ไม่ควรเก็บข้อมูลสำคัญลงใน token เช่น password, ...
		const { password: removePasswordAndStoreOtherIn_TokenData, ...tokenData } = me;
		const token = jwt.sign(tokenData, config.jwtSecret, {
			expiresIn: cookieExpireIn,
		});
		setCookie(config.jwtCookieName, token, {
			maxAge: 1000 * cookieExpireIn,
			httpOnly: true,
		});
		return json({ me: tokenData, token });
	}
	return error('ไม่พบข้อมูลผู้ใช้');
};

export const logout = (req, { json, clearCookie }) => {
	clearCookie(config.jwtCookieName);
	json();
};

export const me = async ({ user }, { json, error }) => {
	const [me] = await mysql.query('select * from users where id = ?', [user!.id]);
	if (me) {
		return json({ me });
	}
	return error('ไม่พบข้อมูลผู้ใช้');
};
