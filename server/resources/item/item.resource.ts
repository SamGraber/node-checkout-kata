import { Application } from 'express';
import { Injectable } from 'ditsy';
import { ExpressApplication } from '../../expressApp';
import { Config } from '../../../config';
import { Item } from './item.model';
import { createResource } from '../resource';

@Injectable()
export class ItemResource {
	app: Application;
	config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
	}

	register(path: string) {
		path = this.config.baseUrl + path;
		createResource(this.app, path, Item);
	}

	seed() {
		Item.create(<any>{ sku: 'A', price: 50 }).subscribe();
		Item.create(<any>{ sku: 'B', price: 30 }).subscribe();
		Item.create(<any>{ sku: 'C', price: 20 }).subscribe();
		Item.create(<any>{ sku: 'D', price: 15 }).subscribe();
	}
}
