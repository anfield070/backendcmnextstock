import { Model, BuildOptions } from 'sequelize';

export interface ILottoAttributes {
	id: number;
	status: number;
	lotto_name_th: string;
	lotto_name_en: string;
}
export interface ILottoModel extends ILottoAttributes, Model {}
export type ILottoModelStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): ILottoModel;
};
