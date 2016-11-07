import { Application } from 'express';
import { Injectable } from 'ditsy';
import { find, map, filter, reduce } from 'lodash';
import { ExpressApplication } from '../../expressApp';
import { Config } from '../../../config';
import { Cart, ICart, ICheckoutItem } from './cart.model';
import { createResource } from '../resource';

@Injectable()
export class CartResource {
	app: Application;
	config: Config;

	constructor(app: ExpressApplication, config: Config) {
		this.app = <any>app;
		this.config = config;
	}

	register(path: string) {
		path = this.config.baseUrl + path;
		this.app.get(path, (req, res) => {
			console.log('GET: ' + path, req.query);
			Cart.find({ userId: req.query.userId }).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
		});

		this.app.post(path, (req, res) => {
			console.log('POST: ' + path, req.body);
			Cart.create(req.body).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
		});

		this.app.put(path + '/add', (req, res) => this.addItem(path + '/add', req, res));
		this.app.put(path + '/remove', (req, res) => this.removeItem(path + '/remove', req, res));

		this.app.delete(path, (req, res) => {
			console.log('DELETE: ' + path, req.body);
			Cart.remove(req.body).subscribe(() => res.send(), error => res.status(500).send({ error: error }));
		});
	}

	addItem(path, req, res): void {
		console.log('ADD ITEM: ' + path, req.body);
		const itemToIncrement: ICheckoutItem = req.body.item;
		Cart.find({ userId: req.body.userId }).switchMap(([cart]) => {
			let updatedItem: ICheckoutItem = find(cart.items, item => item.sku === itemToIncrement.sku);
			if (updatedItem) {
				updatedItem.quantity += 1;
				cart.items = map(cart.items, item => item.sku === itemToIncrement.sku ? updatedItem : item);
			} else {
				updatedItem = <any>{
					sku: itemToIncrement.sku,
					quantity: 1,
					price: itemToIncrement.price,
				};
				cart.items = [...cart.items, updatedItem];
			}
			this.calculateSubtotal(cart);
			return Cart.update(cart).map(() => cart);
		}).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
	}

	removeItem(path, req, res): void {
		console.log('REMOVE ITEM: ' + path, req.body);
		const itemToIncrement: ICheckoutItem = req.body.item;
		Cart.find({ userId: req.body.userId }).switchMap(([cart]) => {
			let updatedItem: ICheckoutItem = find(cart.items, item => item.sku === itemToIncrement.sku);
			if (updatedItem) {
				updatedItem.quantity -= 1;
				cart.items = map(cart.items, item => item.sku === itemToIncrement.sku ? updatedItem : item);
				cart.items = filter(cart.items, item => item.quantity);
			}
			this.calculateSubtotal(cart);
			return Cart.update(cart).map(() => cart);
		}).subscribe(result => res.send(result), error => res.status(500).send({ error: error }));
	}

	calculateSubtotal(cart: ICart): void {
		cart.subtotal = reduce(cart.items, (total, item) => total + (item.price * item.quantity), 0);
	}
}
