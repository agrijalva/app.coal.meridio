import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';

import { HomePage } from '../home/home';
import { BuscarcatPage } from '../buscarcat/buscarcat';
import { ResultadosPage } from '../resultados/resultados';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {
    private url: string = 'http://coal.com.mx:1100';
    private categorias: any;
    private enlaces: any;

    //Variables para la peticion de enlaces
    public idUsuario: any = 1;
    private filtrosData = {
        palabraClave: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient, public loadingCtrl: LoadingController) {
    }

    private _urlCategorias = this.url + "/api/categoria/categorias";
    private _urlEnlaces = this.url + "/api/enlaces/enlacesTodas";

    ionViewDidLoad() {
        this.getCategorias();
    };

    getCategorias() {
        let Params = new HttpParams();
        this._http.get(this._urlCategorias, { params: Params }).subscribe(data => {
            this.categorias = data;
            if (this.categorias.length > 0) {
                this.categorias.forEach(function (value) {
                    value.imagen = '../../assets/imgs/categorias/' + value.imagen;
                });
            }
        });
    };

    goFiltro() {
        this.navCtrl.push(HomePage);
    };

    goBuscarCat(categoria) {
        this.navCtrl.push(BuscarcatPage, { sendCat: categoria });
    };

    search(busqueda: string) {
        let loading = this.loadingCtrl.create({
            content: '',
            spinner: 'crescent'
        });

        loading.present();

        let Params = new HttpParams();
        Params = Params.append( 'idUsuario', this.idUsuario );
		Params = Params.append( 'idCategoria', '0' );
		Params = Params.append( 'idTema', '');
		Params = Params.append( 'titulo', busqueda);
		Params = Params.append( 'descripcion', busqueda);
		Params = Params.append( 'clave', '' );
        Params = Params.append( 'idIdioma', '0' );
        console.log( 'Params', Params );
        this._http.get(this._urlEnlaces, { params: Params }).subscribe(data => {
            this.enlaces = data
            if (this.enlaces.length > 0) {
                loading.dismiss();
                this.navCtrl.push(ResultadosPage, { enlaces: this.enlaces });
            };
        });
    };

};
