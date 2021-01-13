import jwt from 'jsonwebtoken';
import mysql from '../mysql';
import moment from 'moment';

const bcrypt = require('bcryptjs');

export async function getuserbyid(id) {
	try {
		let data = await mysql.query('select * from user where id = ? ', [id]);
		if (!data.length) return 0;
		return data[0];
	} catch (e) {
		return e;
	}
}
export const datenow = () => {
	let datatime = moment().format('yyyy-MM-DD HH:mm:ss');
	return datatime;
};

export const login = async ({ body }, { json, error }) => {
	try {
		const data = await mysql.query('select * from user where username = ? ', [body.username]);

		if (!data.length) {
			return error('Incorrect username');
		}

		if (bcrypt.compareSync(body.password, data[0].password)) {
			// const payload = { username, level: 'normal' };
			// const token = jwt.sign(payload);

			return json({ data: data[0] || [] });
		}
		return error('Incorrect password111');
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const create = async ({ body }, { json, error }) => {
	try {
		if (!(body.username && body.password && body.name)) {
			return error('กรุณากรอกข้อมูลให้ครบ');
		}

		body.password = bcrypt.hashSync(body.password, 8);

		await mysql.query('insert into user (username,password,name,createdAt,type) VALUES (?,?,?,?,?)', [
			body.username,
			body.password,
			body.name,
			datenow(),
			'admin',
		]);
		return json();
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const edit = async ({ params, body }, { json, error }) => {
	try {
		const data = await mysql.query('select * from product where id = ? ', [params.id]);

		if (!data.length) {
			return error('ไม่พบข้อมูล');
		}

		return json({ data: data || [] });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const update = async ({ body }, { json, error }) => {
	try {
		if (!(body.id && body.username && body.password && body.name)) {
			return error('กรุณากรอกข้อมูลให้ครบ');
		}

		let user = await getuserbyid(body.id);

		if (!user) {
			return error('ไม่พบข้อมูล');
		}

		body.password = bcrypt.hashSync(body.password, 8);

		const sss = await mysql.query('update user set username=?, password=?, name=? , updatedAt=? where id = ?', [
			body.username,
			body.password,
			body.name,
			datenow(),
			body.id,
		]);

		return json({ data: (await getuserbyid(body.id)) || [] });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const delete_data = async ({ body }, { json, error }) => {
	try {
		if (!body.id) {
			return error('กรุณากรอกข้อมูลให้ครบ');
		}
		await mysql.query('delete from user where id = ?', [body.id]);
		return json();
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};
