import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, 
		HttpParams, } from '@angular/common/http';

import { ResultadosPage } from '../resultados/resultados';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	private url: string = 'http://localhost:1100';
	
	private filtrosData = {
				materia: '',
				tema: '',
				titulo: '',
				palabraClave: ''
			};
	private categorias: any;
		
	constructor(public navCtrl: NavController, private _http: HttpClient) {	}
	
	private _urlCategorias = this.url + "/api/categoria/categorias";

	ionViewDidLoad() {
		this.getCategorias();
	}

	getFilterData() {
		console.log( 'filtrosData', this.filtrosData );
		this.navCtrl.push( ResultadosPage );
	}

	getCategorias(){
		let Params = new HttpParams();
		this._http.get(this._urlCategorias, {params: Params}).subscribe(data => {
			this.categorias = data;
			console.log( 'categorias', this.categorias );
		});
	};
};
