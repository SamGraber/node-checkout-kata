import * as express from 'express';
import * as bodyParser from 'body-parser';

export class ExpressApplication {}

export const expressApp: express.Application = express();
expressApp.use(bodyParser.json());
