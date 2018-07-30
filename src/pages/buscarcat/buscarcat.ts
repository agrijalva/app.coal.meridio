import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';

import { ResultadosPage } from '../resultados/resultados';


@IonicPage()
@Component({
	selector: 'page-buscarcat',
	templateUrl: 'buscarcat.html',
})
export class BuscarcatPage {
	private url: string = 'http://coal.com.mx:1100';
	public subTitle: string;
	public categorias: any;
	private enlaces: any;
	public imagen: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient, public loadingCtrl: LoadingController) {
	}

	private _urlCategoriasByIdCat = this.url + "/api/enlaces/enlacesByIdCat";

	ionViewDidLoad() {
		this.categorias = this.navParams.get('sendCat');
		console.log( 'categorias', this.categorias );
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
		Params = Params.append("busqueda", busqueda);
		Params = Params.append("idCategoria", this.categorias.idCategoria);
		
		this._http.get(this._urlCategoriasByIdCat, {params: Params}).subscribe(data => {
            this.enlaces = data
            if( this.enlaces.length > 0 ){
				loading.dismiss();
                this.navCtrl.push( ResultadosPage, {enlaces: this.enlaces} );
            }
        });
    }

}
