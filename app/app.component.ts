import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
	offers: any[];
	
	constructor(private http: Http) {}

	ngOnInit(): void {
		this.http.get('http://localhost:3000/api/offer')
				.map(response => response.json())
				.subscribe(data => this.offers = data);
	}
}
