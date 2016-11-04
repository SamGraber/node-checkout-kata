import { Application } from 'express';
import { Injectable } from 'ditsy';
import { ExpressApplication } from '../../expressApp';
import { Config } from '../../../config';
import { Test } from './model';

@Injectable()
export class TestResource {
	app: Application;
	config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
	}

	register(path) {
		path = this.config.baseUrl + path;

		this.app.get(path, (req, res) => {
			console.log('GET: ' + path);
			Test.find((err, result) => {
				if (err) {
					res.status(500).send({ error: err })
				}
				res.send(result)
			});
		});
	}
}

