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

	private urlAddFav = this.url + '/api/actividad/favoritoAdd/';
	private urlLessFav = this.url + '/api/actividad/favoritoRemove/';
	private urlAddView = this.url + '/api/actividad/viewAdd/';

	ionViewDidLoad() {
		this.getEnlaces();
	};

	private getEnlaces() {
		this.enlacesGet = this.navParams.get('enlaces');
	};

	share(categoria) {
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
	};

	public goArticulo(link) {
		console.log( 'link', link );
		let Params = new HttpParams
		Params = Params.append( 'idUsuario', this.idUsuario );
		Params = Params.append( 'idEnlace', link.idEnlace );

		this._http.get( this.urlAddView, { params: Params } ).subscribe(data => {
			if( data[0].success == 1 ){
				const browser = this.iab.create(link.URL);
				
				browser.on('loadstop');//.subscribe(event => {
				// 	browser.insertCSS({ code: "body{color: black;" });
				// });
			};
		});
	};

	starPlus(categoria, index) {
		let Params = new HttpParams;
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idEnlace', categoria.idEnlace);
		this._http.get(this.urlAddFav, { params: Params }).subscribe(data => {
			if (data[0].success == 1) {
				let alert = this.alertCtrl.create({
					title: 'Añadido a favoritos',
					buttons: ['Listo']
				});
				alert.present();
				this.enlacesGet[index]['guardado'] = 1;
			}
		});
	};

	starLess(categoria, index) {
		let Params = new HttpParams;
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idEnlace', categoria.idEnlace);

		this._http.get(this.urlLessFav, { params: Params }).subscribe(data => {
			if( data[0].success == 1 ){
				let alert = this.alertCtrl.create({
					title: 'Eliminado de favoritos',
					buttons: ['Listo']
				});
				alert.present();
				this.enlacesGet[index]['guardado'] = 0;
			};
		});
	};

}
