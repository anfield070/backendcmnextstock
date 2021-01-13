import jwt from 'jsonwebtoken';
import mysql from '../mysql';
import moment from 'moment';
const fs = require('fs-extra');
const path = require('path');

export const datenow = () => {
	let datatime = moment().format('yyyy-MM-DD HH:mm:ss');
	return datatime;
};

// Upload Image
const uploadImage = async (files, doc) => {
	if (files.image != null) {
		const fileExtention = files.image.name.split('.')[1];
		doc.image = `${doc.id}.${fileExtention}`;
		const newpath = `${path.resolve(`${__dirname}/src/uploaded/images/`)}/${doc.image}`;
		if (fs.exists(newpath)) {
			await fs.remove(newpath);
		}
		await fs.moveSync(files.image.path, newpath);

		return newpath;
	}
};

export const list = async ({ body }, { json, error }) => {
	try {
		const data = await mysql.query('select * from product ');
		return json({ data: data || [] });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const create = async ({ body }, { json, error }) => {
	try {
		if (!(body.name && body.stock && body.price)) {
			return error('กรุณากรอกข้อมูลให้ครบ');
		}
		await mysql.query('insert into product (name,stock,price) VALUES (?,?,?)', [body.name, body.stock, body.price]);
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
		if (!(body.id && body.name && body.stock && body.price)) {
			return error('กรุณากรอกข้อมูลให้ครบ');
		}
		await mysql.query('update product set name=?, stock=?, price=? where id = ?', [body.name, body.stock, body.price, body.id]);
		return json();
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
		await mysql.query('delete from product where id = ?', [body.id]);
		return json();
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};
