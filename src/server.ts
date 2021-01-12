import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import * as http from 'http';
import cors from 'cors';

import { config } from './config';
import { IStringMap } from './types/common';
import mysql from './mysql';
import routes from './routes';

const { dev, port, host, corsWhitelist } = config;

const app: express.Application = express();
const httpServer = require('http').Server(app);

if (!dev) {
	app.set('trust proxy', 1); // trust first proxy
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const corsOptions = {
	origin(origin, callback) {
		if (dev || corsWhitelist.includes(origin)) {
			return callback(null, true);
		}
		if (origin) {
			console.error('origin Failed', origin);
		}
		return callback(null, false);
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(routes);

let server: http.Server;
const setupServer = async () => {
	await mysql.checkConnection().catch(e => {
		console.error('Unable to connect to the database:', e);
		throw e;
	});
	await mysql.query(`use ${config.mysql.database}`);
	console.info('MySql Connection has been established successfully.');
	server = app.listen(port, host, () => {
		console.info(`Node.js API server is listening on http://${host}:${port}/`);
	});
};

setupServer();

// Shutdown Node.js app gracefully
async function handleExit(options: IStringMap) {
	await mysql.close();
	if (options.cleanup) {
		const actions = [server.close];
		actions.forEach((close, i) => {
			try {
				close(() => {
					if (i === actions.length - 1) {
						console.info('EXIT!!');
						process.exit();
					}
				});
			} catch (e) {
				if (i === actions.length - 1) {
					console.info('EXIT!!');
					process.exit();
				}
			}
		});
	}
	if (options.exit) {
		console.info('EXIT!!');
		process.exit();
	}
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
