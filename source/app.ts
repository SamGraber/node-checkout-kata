import { Application } from 'express';
import { Injectable } from 'ditsy';
import { Config } from '../config';
import { Database } from './database';
import { ExpressApplication } from './expressApp';
import { TestResource } from './resources/test';

@Injectable()
export class App {
	private app: Application;
	private database: Database;
	private config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
		this.database = new Database(config);
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
		const test = new TestResource(this.app, this.config);
		test.register('/test');
	}
}
