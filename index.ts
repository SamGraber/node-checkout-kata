import 'reflect-metadata/Reflect';
import { Injectable, Injector } from 'ditsy';

@Injectable()
class Engine {
	name = 'engine';
}

@Injectable()
class Car {
	constructor(engine: Engine) {
		console.log(engine);
	}
}

const injector = Injector.resolveAndCreate([
	Engine,
	Car,
]);

const car = injector.get(Car);
