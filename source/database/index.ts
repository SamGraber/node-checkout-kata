import * as mongoose from 'mongoose';
import { Injectable } from 'ditsy';
import { Observable } from 'rxjs/Rx';
import { Config } from '../../config';

@Injectable()
export class Database {
	private config: Config;

	constructor(config: Config) {
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
