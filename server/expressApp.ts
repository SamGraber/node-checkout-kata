import * as express from 'express';
import * as bodyParser from 'body-parser';

export class ExpressApplication {}

export const expressApp: express.Application = express();
expressApp.use(bodyParser.json());
expressApp.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
	next();
});
