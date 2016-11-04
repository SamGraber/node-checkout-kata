import { Injector, Provider } from 'ditsy';
import { Config } from '../config';
import { ExpressApplication, expressApp } from './expressApp';
import { App } from './app';
import { Database } from './database';
import { TestResource } from './resources/test';

export const injector = Injector.resolveAndCreate([
	Config,
	new Provider(ExpressApplication, { useValue: expressApp }),
	App,
	Database,
	TestResource,
]);
