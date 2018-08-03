import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClient, HttpParams, } from '@angular/common/http';

@IonicPage()
@Component({
	selector: 'page-resultados',
	templateUrl: 'resultados.html',
})
export class ResultadosPage {

	public enlacesGet: any;
	//private url: string = 'http://coal.com.mx:1100';
	private url: string = 'http://localhost:1100';
	private urlShare: any = 'http://coal.com.mx:1100/#/link?';
	public starIcon: boolean = true;
	public starIconPush: boolean = false;
	public idUsuario: any = 1;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private iab: InAppBrowser,
		public actionSheetCtrl: ActionSheetController,
		private socialSharing: SocialSharing,
		private _http: HttpClient,
		private alertCtrl: AlertController) { }

	private urlAddFav = this.url + '/api/actividad/favoritoAdd/'

	ionViewDidLoad() {
		this.getEnlaces();
	};

	private getEnlaces() {
		this.enlacesGet = this.navParams.get('enlaces');
		console.log('enlacesGte', this.enlacesGet);
	};

	public goArticulo(link) {
		const browser = this.iab.create(link);

		browser.on('loadstop').subscribe(event => {
			//browser.insertCSS({ code: "body{color: blac;" });
		});
	};

	share(categoria) {
		console.log('catregoria', categoria);
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Compartir',
			buttons: [
				{
					text: 'Facebook',
					icon: 'logo-facebook',
					handler: () => {
						this.socialSharing.shareViaFacebook('Este contenido te puede interesar... ' + categoria.titulo, null, this.urlShare + categoria.idEnlace);
					}
				}, {
					text: 'WhatsApp',
					icon: 'logo-whatsapp',
					handler: () => {
						this.socialSharing.shareViaWhatsApp('Este contenido te puede interesar... ' + categoria.titulo, null, this.urlShare + categoria.idEnlace);
					}
				}, {
					text: 'Twitter',
					icon: 'logo-twitter',
					handler: () => {
						this.socialSharing.shareViaTwitter('Este contenido te puede interesar... ' + categoria.titulo, null, this.urlShare + categoria.idEnlace);
					}
				}, {
					text: 'Compartir',
					icon: 'md-share',
					handler: () => {
						this.socialSharing.share('Este contenido te puede interesar... ' + categoria.titulo, null, null, this.urlShare + categoria.idEnlace);
					}
				}, {
					text: 'Cancelar',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}

	starPlus(categoria) {
		console.log('categoria', categoria);
		console.log(this.urlAddFav);
		let Params = new HttpParams
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idEnlace', categoria.idEnlace);
		this._http.get(this.urlAddFav, { params: Params } ).subscribe(data => {
			console.log('dataAdd', data);
			if (data[0].success == 1) {
				let alert = this.alertCtrl.create({
					title: 'Añadido a favoritos',
					buttons: ['Listo']
				});
				alert.present();
			}
		});
		if (this.starIcon == true && this.starIconPush == false) {
			this.starIcon = false;
			this.starIconPush = true;
		} else {
			this.starIcon = true;
			this.starIconPush = false;
		};
	};

}
