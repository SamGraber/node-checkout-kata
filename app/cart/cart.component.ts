import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
	moduleId: module.id,
	selector: 'ch-cart',
	templateUrl: 'cart.component.html',
})
export class CartComponent {
	constructor(public cartService: CartService) {}

	remove(item: any): void {
		this.cartService.removeFromCart(item);
	}
}
