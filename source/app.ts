import { Application } from 'express';
import { Injectable } from 'ditsy';
import { Config } from '../config';
import { Database } from './database';
import { ExpressApplication } from './expressApp';
import { TestResource } from './resources/test';

@Injectable()
export class App {
	private app: Application;
	private config: Config;
	private database: Database;
	private testResource: TestResource;

	constructor(app: ExpressApplication
			, config: Config
			, database: Database
			, testResource: TestResource) {
		this.app = <any>app;
		this.config = config;
		this.database = database;
		this.testResource = testResource;
	}

	start() {
		this.routes();

		this.database.connect().subscribe(() => {
			this.app.listen(this.config.port, () => {
				console.log('Application listening on port ' + this.config.port);
			});
		}, err => {
			console.log(`Failed to load application: ${err}`);
		});
	}

	routes() {
		this.testResource.register('/test');
	}
}
