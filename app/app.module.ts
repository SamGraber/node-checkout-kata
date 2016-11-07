import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ItemsComponent }  from './items/items.component';

@NgModule({
	imports: [BrowserModule, HttpModule],
	declarations: [
		AppComponent,
		ItemsComponent,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
