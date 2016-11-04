import * as mongoose from 'mongoose';
import { Observable } from 'rxjs/Rx';
import { IConfig } from '../../config';

export class Database {
	private config: IConfig;

	constructor(config: IConfig) {
		this.config = config;
	}

	connect(): Observable<{}> {
		const connectionString = `mongodb://${this.config.dbHost}/${this.config.dbName}`;
		mongoose.connect(connectionString);
		const db = mongoose.connection;

		return new Observable(observer => {
			db.on('error', err => observer.error(err));
			db.once('open', () => {
				observer.next()
				observer.complete()
			});
		});
	}
}
