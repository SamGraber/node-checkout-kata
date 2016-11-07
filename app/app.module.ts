import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ItemsComponent }  from './items/items.component';
import { CartComponent }  from './cart/cart.component';
import { CartService }  from './cart/cart.service';

@NgModule({
	imports: [BrowserModule, HttpModule],
	declarations: [
		AppComponent,
		ItemsComponent,
		CartComponent,
	],
	providers: [CartService],
	bootstrap: [AppComponent]
})
export class AppModule { }
