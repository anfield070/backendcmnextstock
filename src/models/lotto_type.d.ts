import { Model, BuildOptions } from 'sequelize';

export interface ILottoTypeAttributes {
	id: number;
	lotto_name_th: string;
	lotto_name_en: string;
	status: number;
}
export interface ILottoTypeModel extends ILottoTypeAttributes, Model {}
export type ILottoTypeModelStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): ILottoTypeModel;
};
