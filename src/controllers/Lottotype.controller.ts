import jwt from 'jsonwebtoken';
import { models_lottotype } from '../config';
import mysql from '../mysql';

export const list = async ({ user, body }, { json, error }) => {
	try {
		// const dataList = await mysql.query('select * from lotto_type limit 30');
		const dataList = await models_lottotype.findAll({ where: { status: 1 } });
		json({ msg: 200, data: dataList || [] });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const create = async ({ user, body }, { json, error }) => {
	const { lotto_name_th, lotto_name_en } = body;
	if (!(lotto_name_th && lotto_name_en)) {
		return error('กรุณากรอกข้อมูลให้ครบ');
	}

	const ck_duplicate = await models_lottotype.findOne({ where: { lotto_name_th } });

	if (ck_duplicate) {
		return error('ข้อมูลซ้ำ');
	}

	try {
		// const insert = await mysql.query('insert into lotto_type (lotto_name_th, lotto_name_en) VALUES (?, ?)', [lotto_name_th, lotto_name_en]);
		const insert = await models_lottotype.create(body);
		json({ msg: 'เพิ่มข้อมูลสำเร็จ !!!', data: insert.id });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const update = async ({ user, body }, { json, error }) => {
	const { id, lotto_name_th, lotto_name_en, status } = body;
	if (!id) {
		return error('กรุณากรอกข้อมุลให้ครบ');
	}
	if (!(lotto_name_th && lotto_name_en)) {
		return error('กรอกข้อมูลให้ครบ');
	}
	try {
		// const update = await mysql.query('update lotto_type set lotto_name_th=?, lotto_name_en=? where id = ?', [lotto_name_th, lotto_name_en, id]);
		await models_lottotype.update(
			{ lotto_name_th, lotto_name_en, status },
			{
				where: {
					id,
				},
			},
		);
		return json({ msg: 'อัพเดทข้อมูลสำเร็จ !!!' });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};

export const delete_data = async ({ user, body }, { json, error }) => {
	const { id } = body;
	if (!id) {
		return error('กรุณากรอกข้อมุลให้ครบ');
	}

	try {
		// await mysql.query('delete from lotto_type where id = ?', [id]);
		await models_lottotype.destroy({
			where: {
				id,
			},
		});
		return json({ msg: 'ทำรายการลบสำเร็จ !!!' });
	} catch (e) {
		console.error(e);
		error(e.message, 500);
	}
};
