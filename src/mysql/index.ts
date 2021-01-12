import mysql from 'mysql';
import { config } from '../config';

class MySql {
	public pool: mysql.Pool;

	constructor() {
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: config.mysql.host,
			user: config.mysql.user,
			password: config.mysql.password,
			database: config.mysql.database,
		});
	}

	public checkConnection(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.pool.getConnection(function(err, connection) {
				if (err) {
					return reject(err);
				}
				return resolve(true);
			});
		});
	}

	public close(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.pool.end(function(err) {
				if (err) {
					return reject(err);
				}
				return resolve(true);
			});
		});
	}

	public query(query: string, params: Array<any> = []): Promise<any> {
		return new Promise((resolve, reject) => {
			this.pool.query(query, params, function(error, results, fields) {
				if (error) {
					return reject(error);
				}
				return resolve(results);
			});
		});
	}
}

export default new MySql();
