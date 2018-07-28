import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';

import { HomePage } from '../home/home';
import { BuscarcatPage } from '../buscarcat/buscarcat';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {
    private url: string = 'http://localhost:1100';
    private categorias: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient) {
    }

    private _urlCategorias = this.url + "/api/categoria/categorias";

    ionViewDidLoad() {
        this.getCategorias();
    };

    getCategorias(){
		let Params = new HttpParams();
		this._http.get(this._urlCategorias, {params: Params}).subscribe(data => {
			this.categorias = data;
			if( this.categorias.length > 0 ){
                this.categorias.forEach(function(value){
                    value.imagen = '../../assets/imgs/categorias/' + value.imagen;
                });
            }
		});
	};

    goFiltro() {
        this.navCtrl.push(HomePage);
    };

    goBuscarCat(categoria){
        this.navCtrl.push( BuscarcatPage, {sendCat: categoria} );
    }
};
