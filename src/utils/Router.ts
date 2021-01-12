import express from 'express';
import { CookieOptions } from 'express-serve-static-core';
import expressJwt from 'express-jwt';

import { config } from '../config';
import {} from '../types/common';

type TMethod = 'get' | 'post' | 'put' | 'delete' | 'use';

type TRouterRequestContext = {
	user?: Partial<TUser>;
	getIP?: () => string;
} & express.Request;

type TRouterResponseContext = {
	error: (msg: string, code?: number) => void;
	json: (data?: object) => void;
	res: express.Response;
	setCookie: (name: string, value: any, options?: CookieOptions) => void;
	clearCookie: (name: string, domain?: string) => void;
};

type TCommonHandler = (req: TRouterRequestContext, res: TRouterResponseContext, next: express.NextFunction) => any;

export class Router {
	constructor(public router: express.Router) {}

	static get decodeJwt() {
		return expressJwt({
			secret: config.jwtSecret,
			getToken: req => {
				if (req.headers.authorization) {
					const [, token] = req.headers.authorization.match(/^Bearer (.+)/) || [];
					return token;
				}
				return null;
			},
		});
	}

	static setError(res: express.Response, errorMessage: string, code = 200): void {
		res.status(code);
		res.json({ status: 0, code: 500, msg: `fail: ${errorMessage}` });
	}

	static setJson(res: express.Response, data?: object): void {
		res.status(200);
		res.json({ status: 1, code: 200, msg: 'success', ...(data || {}) });
	}

	static setCookie(res: express.Response, name: string, value: any, options: CookieOptions = {}) {
		res.cookie(name, value, {
			maxAge: 1000 * 60 * 30, // 30 minutes
			secure: config.isHttps,
			domain: config.cookieDomain,
			...options,
		});
	}

	static clearCookie(res: express.Response, name: string, domain: string) {
		res.clearCookie(name, {
			domain,
		});
	}

	static createRequestContext(req: express.Request): TRouterRequestContext {
		return Object.assign(req, { getIp: () => this.getIP(req) });
	}

	static createResponseContext(res: express.Response): TRouterResponseContext {
		return {
			error: (msg, code = 200) => Router.setError(res, msg, code),
			json: (data?) => Router.setJson(res, data),
			setCookie: (name, value, options: CookieOptions = {}) => {
				Router.setCookie(res, name, value, options);
			},
			clearCookie: (name, domain = config.cookieDomain) => {
				Router.clearCookie(res, name, domain);
			},
			res,
		};
	}

	static getIP(req: express.Request): string {
		try {
			if (config.dev) {
				return '127.0.0.1';
			}
			let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
			if (!ip && req.connection) {
				ip = req.connection.remoteAddress;
			}
			if (!ip && req.socket) {
				ip = req.socket.remoteAddress;
			}
			if (ip) {
				ip = ip
					.toString()
					.replace(/^.*:/, '')
					.split(',')[0];
				if (ip.length > 15) {
					ip = ip.substr(0, 15);
				}
				return ip;
			}
		} catch (e) {
			console.error('getIP', e);
		}
		return '';
	}

	public get(path: string, handler: TCommonHandler) {
		return this.commonRoute('get', path, handler);
	}

	public post(path: string, handler: TCommonHandler) {
		return this.commonRoute('post', path, handler);
	}

	public put(path: string, handler: TCommonHandler) {
		return this.commonRoute('put', path, handler);
	}

	public delete(path: string, handler: TCommonHandler) {
		return this.commonRoute('delete', path, handler);
	}

	public use(path: string, handler: TCommonHandler) {
		return this.commonRoute('use', path, handler);
	}

	public error(handler: (err: Error, req: TRouterRequestContext, res: TRouterResponseContext, next: express.NextFunction) => void) {
		return this.router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
			try {
				handler(err, Router.createRequestContext(req), Router.createResponseContext(res), next);
			} catch (e) {
				next(e);
			}
		});
	}

	private commonRoute(method: TMethod, path: string, handler: TCommonHandler): void {
		this.router[method](path, (req, res, next) => {
			try {
				handler(Router.createRequestContext(req), Router.createResponseContext(res), next);
			} catch (e) {
				next(e);
			}
		});
	}
}

export default Router;
