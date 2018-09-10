import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ResultadosPage } from '../resultados/resultados';


@IonicPage()
@Component({
	selector: 'page-buscarcat',
	templateUrl: 'buscarcat.html',
})
export class BuscarcatPage {
	private url: string = 'http://coal.com.mx:1100';
	// private url: string = 'http://novus.cem.itesm.mx:1100';
	// private url: string = 'http://localhost:1100';
	public idUsuario: any = 1;
	public subTitle: string;
	public categorias: any;
	private enlaces: any;
	public imagen: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _http: HttpClient,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private screenOrientation: ScreenOrientation) {
	}

	private _urlCategoriasByIdCat = this.url + "/api/enlaces/busquedaEnlaces";

	ionViewDidLoad() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		this.categorias = this.navParams.get('sendCat');
		this.imagen = this.categorias.imagen;
		this.subTitle = this.categorias.categoria;
	}

	search(busqueda: string) {
		let loading = this.loadingCtrl.create({
			content: '',
			spinner: 'crescent'
		});

		loading.present();
		let Params = new HttpParams();
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idCategoria', this.categorias.idCategoria);
		Params = Params.append('idTema', '0');
		Params = Params.append('titulo', busqueda);
		Params = Params.append('descripcion', busqueda);
		Params = Params.append('clave', '');
		Params = Params.append('idIdioma', '0');
		this._http.get(this._urlCategoriasByIdCat, { params: Params }).subscribe(data => {
			this.enlaces = data;
			if (this.enlaces.length > 0) {
				loading.dismiss();
				this.navCtrl.push(ResultadosPage, { enlaces: this.enlaces });
			} else {
				loading.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Resultados',
					subTitle: 'No se encontraron enlaces.',
					buttons: ['Cerrar']
				});
				alert.present();
			};
		});
	};

	searchAll() {
		let loading = this.loadingCtrl.create({
			content: '',
			spinner: 'crescent'
		});

		loading.present();
		let Params = new HttpParams();
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idCategoria', this.categorias.idCategoria);
		Params = Params.append('idTema', '0');
		Params = Params.append('titulo', '');
		Params = Params.append('descripcion', '');
		Params = Params.append('clave', '');
		Params = Params.append('idIdioma', '0');
		this._http.get(this._urlCategoriasByIdCat, { params: Params }).subscribe(data => {
			this.enlaces = data;
			if (this.enlaces.length > 0) {
				loading.dismiss();
				this.navCtrl.push(ResultadosPage, { enlaces: this.enlaces });
			} else {
				loading.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Resultados',
					subTitle: 'No se encontraron enlaces.',
					buttons: ['Cerrar']
				});
				alert.present();
			};
		});
	};


};
