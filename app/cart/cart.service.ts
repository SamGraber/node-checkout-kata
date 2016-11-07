import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class CartService {
	private _cart: BehaviorSubject<any>;
	
	constructor(private http: Http) {
		this._cart = new BehaviorSubject(null);
		http.get('http://localhost:3000/api/cart?userId=1')
			.map(response => response.json())
			.subscribe(cart => this._cart.next(cart));
	}

	get cart$(): Observable<any> {
		return this._cart.asObservable();
	}

	addToCart(item): void {
		const data = { userId: 1, item };
		this.http.put('http://localhost:3000/api/cart/add', JSON.stringify(data), this.getOptions())
			.map(response => response.json())
			.subscribe(cart => this._cart.next(cart));
	}

	removeFromCart(item): void {
		const data = { userId: 1, item };
		this.http.put('http://localhost:3000/api/cart/remove', JSON.stringify(data), this.getOptions())
			.map(response => response.json())
			.subscribe(cart => this._cart.next(cart));
	}

	private getOptions(): RequestOptions {
		const headers: Headers = new Headers({
			'Content-Type': 'application/json',
		});
		return new RequestOptions({ headers });
	}
}
