import { App } from './source/app';
import { config, IConfig } from './config';

const app = new App(config);
app.start();
