import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { CartService } from '../cart/cart.service';

@Component({
	moduleId: module.id,
	selector: 'ch-items',
	templateUrl: 'items.component.html',
})
export class ItemsComponent implements OnInit {
	items: any[];
	
	constructor(private http: Http
			, private cartService: CartService) {}

	ngOnInit(): void {
		this.http.get('http://localhost:3000/api/item')
				.map(response => response.json())
				.subscribe(data => this.items = data);
	}

	add(item: any): void {
		this.cartService.addToCart(item);
	}
}
