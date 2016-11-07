import { Application } from 'express';
import { ModelService, Document } from '../database/model.service';

export interface IResourceOptions {
	useGet?: boolean;
	usePost?: boolean;
	usePut?: boolean;
	useDelete?: boolean;
}

export function createResource<T extends Document>(app: Application, path: string, model: ModelService<T>, options?: IResourceOptions): void {
	options = defaultOptions(options);
	
	if (options.useGet) {
		app.get(path, (req, res) => {
			console.log('GET: ' + path);
			model.find({}).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
		});
	}

	if (options.usePost) {
		app.post(path, (req, res) => {
			console.log('POST: ' + path, req.body);
			model.create(req.body).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
		});
	}

	if (options.usePut) {
		app.put(path, (req, res) => {
			console.log('PUT: ' + path, req.body);
			model.update(req.body).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
		});
	}

	if (options.useDelete) {
		app.delete(path, (req, res) => {
			console.log('DELETE: ' + path, req.body);
			model.remove(req.body).subscribe(() => res.send(), error => res.status(500).send({ error: error }));
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
