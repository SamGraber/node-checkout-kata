import { Application } from 'express';
import { IConfig } from '../../../config';
import { Test } from './model';

export class TestResource {
	app: Application;
	config: IConfig;

	constructor(app: Application, config: IConfig) {
		this.app = app;
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

