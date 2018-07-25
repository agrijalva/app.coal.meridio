import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ResultadosPage } from '../resultados/resultados'

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
		this.navCtrl.setRoot( ResultadosPage );
	}

}
