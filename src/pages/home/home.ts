import { Component } from '@angular/core';
import { NavController  } from 'ionic-angular';
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
	public idiomas: any;
	public temas: any;

	public categoria: any
	public tema: any;
	public idioma: any;
	
	private filtrosData = {
				descripcion: '',
				titulo: '',
				palabraClave: ''
			};
		
	constructor(public navCtrl: NavController, private _http: HttpClient) {	}
	
	private _urlCategorias = this.url + "/api/categoria/categorias";
	private _urlIdiomas = this.url + "/api/idioma/idiomas";
	private _urlTemas = this.url + "/api/tema/temaByIdCat";

	ionViewDidLoad() {
		this.getCategorias();
		this.getIdiomas();
	};

	getFilterData() {
		console.log( 'titulo', this.filtrosData.titulo );
		console.log( 'descripcion', this.filtrosData.descripcion );
		console.log( 'palabraClave', this.filtrosData.palabraClave );
		console.log( 'categoria', this.categoria );
		console.log( 'tema', this.tema );
		console.log( 'idioma', this.idioma );
		//this.navCtrl.push( ResultadosPage );
	};

	getCategorias(){
		let Params = new HttpParams();
		this._http.get(this._urlCategorias, {params: Params}).subscribe(data => {
			this.categorias = data;
		});
	};
	
	getTema(idCategoria){
		let Params = new HttpParams();
		Params = Params.append('idCategoria', idCategoria);
		this._http.get(this._urlTemas, {params: Params}).subscribe(data => {
			this.temas = data;
		});
	};

	getIdiomas(){
		let Params = new HttpParams();
		this._http.get(this._urlIdiomas, {params: Params}).subscribe(data => {
			this.idiomas = data;
		});
	};
};
