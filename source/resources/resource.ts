import { Application } from 'express';
import { Model, Document } from 'mongoose';

export interface IResourceOptions {
	useGet?: boolean;
	usePost?: boolean;
	usePut?: boolean;
	useDelete?: boolean;
}

export function createResource<T extends Document>(app: Application, path: string, model: Model<T>, options?: IResourceOptions): void {
	options = defaultOptions(options);
	
	if (options.useGet) {
		app.get(path, (req, res) => {
			console.log('GET: ' + path);
			model.find((err, result) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});
	}

	if (options.usePost) {
		app.post(path, (req, res) => {
			console.log('POST: ' + path, req.body);
			model.create(req.body, (err, result) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});
	}

	if (options.usePut) {
		app.put(path, (req, res) => {
			console.log('PUT: ' + path, req.body);
			
			model.update({ _id: req.body._id }, req.body, (err, result) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send(result);
			});
		});
	}

	if (options.useDelete) {
		app.delete(path, (req, res) => {
			console.log('DELETE: ' + path, req.body);
			model.remove(req.body, (err) => {
				if (err) {
					res.status(500).send({ error: err });
				}
				res.send();
			});
		});
	}
}

function defaultOptions(options: IResourceOptions = {}): IResourceOptions {
	return {
		useGet: options.useGet != null ? options.useGet : true,
		usePost: options.usePost != null ? options.usePost : true,
		usePut: options.usePut != null ? options.usePut : true,
		useDelete: options.useDelete != null ? options.useDelete : true,
	}
}
