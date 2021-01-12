import { Sequelize, DataTypes } from 'sequelize';

export default function(sequelize: Sequelize) {
	const attributes = {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: true,
			comment: null,
			field: 'id',
		},
		lotto_name_th: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: 'lotto_name_th',
		},
		lotto_name_en: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: 'lotto_name_en',
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1',
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: 'status',
		},
	};
	const options = {
		tableName: 'lotto_type',
		comment: '',
		indexes: [],
	};
	const LottoTypeModel = sequelize.define('lotto_type_model', attributes, options);
	return LottoTypeModel;
}
