import * as express from 'express';
import { IConfig } from '../config';
import { Database } from './database';
import { TestResource } from './resources/test';

export class App {
	private app: express.Application;
	private database: Database;
	private config: IConfig;

	constructor(config: IConfig) {
		this.app = express();
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
