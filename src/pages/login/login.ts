import { Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	NavParams, 
	MenuController, 
	AlertController, 
	LoadingController,
	Events } from 'ionic-angular';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

//Page Import
import { CategoriasPage } from '../categorias/categorias'

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	//private url: string = 'http://coal.com.mx:1100';
	private url: string = 'http://novus.cem.itesm.mx:1100';
	public loginData = {
		usuario: '',
		pass: ''
	};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private menu: MenuController,
		private _http: HttpClient,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public events: Events,
		private screenOrientation: ScreenOrientation
	) {}

	private urlLogin = this.url + '/api/login/login'

	ionViewDidLoad() {
		this.checkLogin();
		this.menu.swipeEnable(false);
		console.log(this.screenOrientation.type);
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
	};

	checkLogin(){
		if( localStorage.getItem( 'login' ) == '1' ){
			this.events.publish('userName', localStorage.getItem( 'nameUser' ));
			this.navCtrl.setRoot(CategoriasPage);
		};
	};

	login() {
		if (this.loginData.usuario == '' && this.loginData.pass == '') {
			let alert = this.alertCtrl.create({
				title: 'Merídio',
				subTitle: 'Proporciona tus credenciales para poder acceder al sistema.',
				buttons: ['Aceptar']
			});
			alert.present();
		} else if (this.loginData.usuario == '' && this.loginData.pass != '') {
			let alert = this.alertCtrl.create({
				title: 'Merídio',
				subTitle: 'Proporciona tu usuario para poder acceder al sistema.',
				buttons: ['Aceptar']
			});
			alert.present();
		} else if (this.loginData.usuario != '' && this.loginData.pass == '') {
			let alert = this.alertCtrl.create({
				title: 'Merídio',
				subTitle: 'Proporciona tu contraseña para poder acceder al sistema.',
				buttons: ['Aceptar']
			});
			alert.present();
		} else {
			let Params = new HttpParams;
			Params = Params.append('usuario', this.loginData.usuario);
			Params = Params.append('pass', this.loginData.pass);
			this._http.get(this.urlLogin, { params: Params }).subscribe(data => {
				let loading = this.loadingCtrl.create({
					content: '',
					spinner: 'crescent'
				});
				if (data[0].success == 0) {
					loading.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Merídio',
						subTitle: data[0].msg,
						buttons: ['Aceptar']
					});
					alert.present();
				}else{
					loading.dismiss();
					//console.log( data );
					this.navCtrl.setRoot(CategoriasPage);
					localStorage.setItem( 'login', '1' );
					localStorage.setItem( 'nameUser', data[0].nombre );
					this.events.publish('userName', data[0].nombre);
				};
			});
		};

	};

}
