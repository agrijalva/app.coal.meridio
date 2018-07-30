import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';

import { ResultadosPage } from '../resultados/resultados';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	private url: string = 'http://coal.com.mx:1100';
	public categorias: any;
	
	private filtrosData = {
				materia: '',
				tema: '',
				titulo: '',
				palabraClave: ''
			};
		
	constructor(public navCtrl: NavController, private _http: HttpClient, private alertCtrl: AlertController) {	}
	
	private _urlCategorias = this.url + "/api/categoria/categorias";

	ionViewDidLoad() {
		this.getCategorias();
		let alert = this.alertCtrl.create({
			title: 'URL',
			subTitle: this._urlCategorias,
			buttons: ['Dismiss']
		  });
		  alert.present();
	}

	getFilterData() {
		this.navCtrl.push( ResultadosPage );
	}

	getCategorias(){
		let Params = new HttpParams();
		this._http.get(this._urlCategorias, {params: Params}).subscribe(data => {
			
			this.categorias = data;
			let alert = this.alertCtrl.create({
				title: 'URL',
				subTitle: this.categorias,
				buttons: ['Cerrar']
			  });
			  alert.present();
		});
	};
};
