import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public categoria: string = '';
	public filtrosData = {
				materia: '',
				tema: '',
				titulo: '',
				palabraClave: ''
			};

	constructor(public navCtrl: NavController) {

	}

	getFilterData() {
		console.log('data', this.filtrosData);
		console.log( 'cat', this.categoria );
	}

}
