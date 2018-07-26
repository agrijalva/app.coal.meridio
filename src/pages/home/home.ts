import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ResultadosPage } from '../resultados/resultados'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public categoria: number = 0;
	public filtrosData = {
				materia: '',
				tema: '',
				titulo: '',
				palabraClave: ''
			};

	public categorias = [
		{ value: 1, nombre: 'Animación sovietica' },
		{ value: 2, nombre: 'Anime' },
		{ value: 3, nombre: 'Caricaturas' },
		{ value: 4, nombre: 'Cartoon' },
		{ value: 5, nombre: 'Documental' },
		{ value: 6, nombre: 'Entrevista' },
		{ value: 7, nombre: 'Imágenes de televisión' },
		{ value: 8, nombre: 'Grabación original' },
		{ value: 9, nombre: 'Imágenes históricas y voz original' },
		{ value: 10, nombre: 'Imágenes históricas' },
		{ value: 11, nombre: 'Largometraje' },
		{ value: 12, nombre: 'Programa televisivo' },
		{ value: 13, nombre: 'Reportaje' }
	];

	constructor(public navCtrl: NavController) {

	}

	getFilterData() {
		console.log( 'cat', this.categoria );
		//this.navCtrl.setRoot( ResultadosPage );
	}

}
