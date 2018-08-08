import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpParams, } from '@angular/common/http';

//Page Import
import { CategoriasPage } from '../categorias/categorias'

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	private url: string = 'http://coal.com.mx:1100';
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
		public loadingCtrl: LoadingController
	) {
	}

	private urlLogin = this.url + '/api/login/login'

	ionViewDidLoad() {
		this.checkLogin();
		this.menu.swipeEnable(false);
	}

	checkLogin(){
		if( localStorage.getItem( 'login' ) == '1' ){
			this.navCtrl.setRoot(CategoriasPage);
		}
	}

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
					this.navCtrl.setRoot(CategoriasPage);
					localStorage.setItem( 'login', '1' );
				}
			});
		}

	}

}
