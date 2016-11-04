import 'reflect-metadata/Reflect';
import { App } from './source/app';
import { injector } from './source/module';

const app = injector.get(App);
app.start();
