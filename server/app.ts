import { Application } from 'express';
import { Injectable } from 'ditsy';
import { Config } from '../config';
import { Database } from './database';
import { ExpressApplication } from './expressApp';
import { ItemResource } from './resources/item';
import { OfferResource } from './resources/offer';
import { CartResource } from './resources/cart';

@Injectable()
export class App {
	private app: Application;
	private config: Config;
	private database: Database;
	private itemResource: ItemResource;
	private offerResource: OfferResource;
	private cartResource: CartResource;

	constructor(app: ExpressApplication
			, config: Config
			, database: Database
			, itemResource: ItemResource
			, offerResource: OfferResource
			, cartResource: CartResource) {
		this.app = <any>app;
		this.config = config;
		this.database = database;
		this.itemResource = itemResource;
		this.offerResource = offerResource;
		this.cartResource = cartResource;
	}

	start() {
		this.routes();
		// this.itemResource.seed();
		// this.offerResource.seed();

		this.database.connect().subscribe(() => {
			this.app.listen(this.config.port, () => {
				console.log('Application listening on port ' + this.config.port);
			});
		}, err => {
			console.log(`Failed to load application: ${err}`);
		});
	}

	routes() {
		this.itemResource.register('/item');
		this.offerResource.register('/offer');
		this.cartResource.register('/cart');
	}
}
