import { Model, BuildOptions } from 'sequelize';

export interface IUsersAttributes {
	id: number;
	username: string;
	password: string;
	name: string;
	created_at?: Date;
	updated_at?: Date;
	created_by?: number;
	updated_by?: number;
	phone: string;
	idline?: string;
	otp: string;
	email?: string;
	bank_id: number;
	payrate_id: number;
	agent: number;
	lv: number;
	date_open: any;
	date_close: any;
	last_ip?: string;
	last_login?: string;
	status_lock?: string;
	status_user?: string;
	status_api?: string;
	credit?: number;
	credit_award?: number;
	codepromotion?: string;
}
export interface IUsersModel extends IUsersAttributes, Model {}
export type IUsersModelStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): IUsersModel;
};
