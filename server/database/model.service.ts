import { Observable } from 'rxjs';
import { Model, Document } from 'mongoose';

export { Document };

export class ModelService<T extends Document> {
	model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}
	
	find(query: any = {}): Observable<T[]> {
		return new Observable(observer => {
			this.model.find(query, (error, result) => {
				if (error) {
					observer.error(error);
				} else {
					observer.next(result);
					observer.complete();
				}
			});
		});
	}

	create(obj: T): Observable<T> {
		return new Observable(observer => {
			this.model.create(obj, (error, result) => {
				if (error) {
					observer.error(error);
				} else {
					observer.next(result);
					observer.complete();
				}
			});
		});
	}

	update(obj: T): Observable<T> {
		return new Observable(observer => {
			this.model.update({ _id: obj._id }, obj, (error, result) => {
				if (error) {
					observer.error(error);
				} else {
					observer.next(result);
					observer.complete();
				}
			});
		});
	}

	remove(obj: T): Observable<T> {
		return new Observable(observer => {
			this.model.remove(obj, error => {
				if (error) {
					observer.error(error);
				} else {
					observer.next();
					observer.complete();
				}
			});
		});
	}
}