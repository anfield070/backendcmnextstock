import jwt from 'jsonwebtoken';
import { models_user } from '../config';
import mysql from '../mysql';

export const list = async (req, { json }) => {
	const userList = await mysql.query('select * from users limit 30');
	json({ users: userList || [] });
};

export const create = async ({ params, body }, { json, error }) => {
	const { username, password } = body;
	if (username && password) {
		await mysql.query('insert into users (username, password) VALUES (?, ?)', [username, password]);
		return json();
	}
	return error('กรุณากรอกข้อมูลให้ครบ');
};

export const update = async ({ params, body }, { json, error }) => {
	const { id } = params;
	const { username, password } = body;
	if (id) {
		if (username && password) {
			await mysql.query('update users set username=?, password=? where id = ?', [username, password, id]);
			return json();
		}
		return error('กรอกข้อมูลให้ครบ');
	}
	return error('ไม่พบ ID ที่ต้องการ');
};

export const delete_data = async ({ params }, { json, error }) => {
	const { id } = params;
	if (id) {
		await mysql.query('delete from users where id = ?', [id]);
		return json();
	}
	return error('ไม่พบ ID ที่ต้องการ');
};
