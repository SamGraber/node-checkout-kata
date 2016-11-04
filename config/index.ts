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

export class Config implements IConfig {
	port: number;
	baseUrl: string;
	dbHost: string;
	dbName: string;

	constructor() {
		this.port = appConfig.port || defaultConfig.port; 
		this.baseUrl = appConfig.baseUrl || defaultConfig.baseUrl; 
		this.dbHost = appConfig.dbHost || defaultConfig.dbHost; 
		this.dbName = appConfig.dbName || defaultConfig.dbName; 
	}
}
