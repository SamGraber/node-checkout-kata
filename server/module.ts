import { Injector, Provider } from 'ditsy';
import { Config } from '../config';
import { ExpressApplication, expressApp } from './expressApp';
import { App } from './app';
import { Database } from './database';
import { ItemResource } from './resources/item';
import { OfferResource } from './resources/offer';
import { CartResource } from './resources/cart';

export const injector = Injector.resolveAndCreate([
	Config,
	new Provider(ExpressApplication, { useValue: expressApp }),
	App,
	Database,
	ItemResource,
	OfferResource,
	CartResource,
]);
