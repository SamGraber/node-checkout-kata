import { Application } from 'express';
import { Injectable } from 'ditsy';
import { ExpressApplication } from '../../expressApp';
import { Config } from '../../../config';
import { Test } from './testModel';
import { createResource } from '../resource';

@Injectable()
export class TestResource {
	app: Application;
	config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
	}

	register(path: string) {
		path = this.config.baseUrl + path;
		createResource(this.app, path, Test);
	}
}
