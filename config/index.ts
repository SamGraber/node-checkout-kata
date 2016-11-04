import { assign } from 'lodash';
import { config as appConfig } from './appConfig';

export interface IConfig {
	port: number,

	baseUrl: string,

	dbHost: string,
	dbName: string,
}

export const defaultConfig: IConfig = {
	port: 3000,

	baseUrl: '/api',

	dbHost: 'localhost',
	dbName: 'di-test',
};

export const config = assign({}, defaultConfig, appConfig);
