import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
	constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient) {
	}

	private _urlCategoriasByIdCat = this.url + "/api/enlaces/enlacesByIdCat";

	ionViewDidLoad() {
		this.categorias = this.navParams.get('sendCat')
		this.subTitle = this.categorias.categoria;
	}

	search(busqueda: string) { 
        let Params = new HttpParams();
		Params = Params.append("busqueda", busqueda);
		Params = Params.append("idCategoria", this.categorias.idCategoria);
		
		this._http.get(this._urlCategoriasByIdCat, {params: Params}).subscribe(data => {
            this.enlaces = data
            if( this.enlaces.length > 0 ){
				
                this.navCtrl.push( ResultadosPage, {enlaces: this.enlaces} );
            }
        });
    }

}
