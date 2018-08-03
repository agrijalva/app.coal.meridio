import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
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
	//private url: string = 'http://coal.com.mx:1100';
	private url: string = 'http://localhost:1100';
	private enlaces: any;
	public idUsuario: any = 1;
	public categorias: any;
	public idiomas: any;
	public temas: any;

	public categoria: any = 0;
	public tema: any = 0;
	public idioma: any = 0;

	private filtrosData = {
		descripcion: '',
		titulo: '',
		palabraClave: ''
	};

	constructor(public navCtrl: NavController, private _http: HttpClient, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private menu: MenuController) { }

	private _urlCategorias = this.url + "/api/categoria/categorias";
	private _urlIdiomas = this.url + "/api/idioma/idiomas";
	private _urlTemas = this.url + "/api/tema/temaByIdCat";
	private _urlEnlaces = this.url + "/api/enlaces/busquedaEnlaces"

	ionViewDidLoad() {
		this.getCategorias();
		this.getIdiomas();
		
		this.menu.swipeEnable(true);
	};

	getFilterData() {
		let loading = this.loadingCtrl.create({
			content: '',
			spinner: 'crescent'
		});

		loading.present();
		let Params = new HttpParams();
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idCategoria', this.categoria);
		Params = Params.append('idTema', this.tema);
		Params = Params.append('titulo', this.filtrosData.titulo);
		Params = Params.append('descripcion', this.filtrosData.descripcion);
		Params = Params.append('clave', this.filtrosData.palabraClave);
		Params = Params.append('idIdioma', this.idioma);
		this._http.get(this._urlEnlaces, { params: Params }).subscribe(data => {
			this.enlaces = data
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

	getCategorias() {
		let Params = new HttpParams();
		this._http.get(this._urlCategorias, { params: Params }).subscribe(data => {
			this.categorias = data;
		});
	};

	getTema(idCategoria) {
		let Params = new HttpParams();
		Params = Params.append('idCategoria', idCategoria);
		this._http.get(this._urlTemas, { params: Params }).subscribe(data => {
			this.temas = data;
		});
	};

	getIdiomas() {
		let Params = new HttpParams();
		this._http.get(this._urlIdiomas, { params: Params }).subscribe(data => {
			this.idiomas = data;
		});
	};
};
