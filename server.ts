import 'reflect-metadata/Reflect';
import { App } from './server/app';
import { injector } from './server/module';

const app = injector.get(App);
app.start();
