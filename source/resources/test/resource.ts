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
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});

		this.app.post(path, (req, res) => {
			console.log('POST: ' + path, req.body);
			Test.create(req.body, (err, result) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});

		this.app.put(path, (req, res) => {
			console.log('PUT: ' + path, req.body);
			
			Test.update({ _id: req.body._id }, req.body, (err, result) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});

		this.app.delete(path, (req, res) => {
			console.log('DELETE: ' + path, req.body);
			Test.remove(req.body, (err) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send();
			});
		});
	}
}

