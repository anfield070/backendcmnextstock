import 'dotenv/config';
import { IStringMap } from './types/common';

export const config: IStringMap = {
	dev: process.env.NODE_ENV !== 'production',
	host: process.env.HOSTNAME || '127.0.0.1',
	port: process.env.PORT || 3001,
	corsWhitelist: (process.env.CORS_WHITE_LIST || '').split(','),
	mysql: {
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
	},
	isHttps: process.env.HTTPS === 'true',
	cookieDomain: process.env.COOKIE_DOMAIN || '',
	jwtCookieName: 'at',
	jwtSecret: process.env.JWT_SECRET,
};

const Sequelize = require('sequelize');

export const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	dialect: 'mysql',
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export const Sequelize = Sequelize;
export const sequelize = sequelize;

export const models_lottotype = sequelize.import('./models/lotto_type.ts');
export const models_user = sequelize.import('./models/users.ts');
