import { Application } from 'express';
import { Injectable } from 'ditsy';
import { ExpressApplication } from '../../expressApp';
import { Config } from '../../../config';
import { Offer } from './offer.model';
import { createResource } from '../resource';

@Injectable()
export class OfferResource {
	app: Application;
	config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
	}

	register(path: string) {
		path = this.config.baseUrl + path;
		createResource(this.app, path, Offer);
	}

	seed() {
		Offer.create(<any>{ sku: 'A', quantity: 3, price: 130 }).subscribe();
		Offer.create(<any>{ sku: 'B', quantity: 2, price: 45 }).subscribe();
	}
}
