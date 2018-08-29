import { Component } from '@angular/core';
import { 
    IonicPage, 
    NavController, 
    NavParams, 
    LoadingController, 
    AlertController,
    Events } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../home/home';
import { BuscarcatPage } from '../buscarcat/buscarcat';
import { ResultadosPage } from '../resultados/resultados';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {
    //private url: string = 'http://coal.com.mx:1100';
	private url: string = 'http://novus.cem.itesm.mx:1100';
	// private url: string = 'http://localhost:1100';
    private categorias: any;
    private enlaces: any;

    //Variables para la peticion de enlaces
    public idUsuario: any = 1;
    
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public _http: HttpClient, 
        public loadingCtrl: LoadingController, 
        private alertCtrl: AlertController,
        public events: Events,
        private screenOrientation: ScreenOrientation) {
    }

    private _urlCategorias = this.url + "/api/categoria/categorias";
    private _urlEnlaces = this.url + "/api/enlaces/busquedaEnlaces";

    ionViewDidLoad() {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.login();
        this.getCategorias();
    };

    login(){
		if( localStorage.getItem( 'login' ) != '1'){
            this.navCtrl.push(LoginPage);
            localStorage.removeItem( 'nameUser' );
		};
	}

    getCategorias() {
        let Params = new HttpParams();
        this._http.get(this._urlCategorias, { params: Params }).subscribe(data => {
            this.categorias = data;
            if (this.categorias.length > 0) {
                this.categorias.forEach(function (value) {
                    value.imagen = 'http://coal.com.mx:1100/images/categorias/' + value.imagen;
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
		Params = Params.append( 'idTema', '0');
		Params = Params.append( 'titulo', busqueda);
		Params = Params.append( 'descripcion', busqueda);
		Params = Params.append( 'clave', '' );
        Params = Params.append( 'idIdioma', '0' );
        this._http.get(this._urlEnlaces, { params: Params }).subscribe(data => {
            this.enlaces = data;
            if (this.enlaces.length > 0) {
                loading.dismiss();
                this.navCtrl.push(ResultadosPage, { enlaces: this.enlaces });
            }else{
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
