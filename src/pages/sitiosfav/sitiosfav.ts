import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
	selector: 'page-sitiosfav',
	templateUrl: 'sitiosfav.html',
})
export class SitiosfavPage {

	private url: string = 'http://coal.com.mx:1100';
	// private url: string = 'http://localhost:1100';
	private urlShare: any = 'http://coal.com.mx:1100/#/link?';
	public idUsuario: any = 1;
	public showDiv: number = 0;
	public favoritos: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private _http: HttpClient,
		public toastCtrl: ToastController,
		private iab: InAppBrowser,
		private socialSharing: SocialSharing,
		public actionSheetCtrl: ActionSheetController,
		private screenOrientation: ScreenOrientation
	) {
	}

	private urlGetFav = this.url + '/api/actividad/favoritoUsuario/';
	private urlLessFav = this.url + '/api/actividad/favoritoRemove/';
	private urlAddView = this.url + '/api/actividad/viewAdd/';

	ionViewDidLoad() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		this.getFavoritos();
	};

	private getFavoritos() {
		let Params = new HttpParams;
		Params = Params.append('idUsuario', this.idUsuario);

		this._http.get(this.urlGetFav, { params: Params }).subscribe(data => {
			this.favoritos = data;
			if (this.favoritos.length > 0) {
				this.showDiv = 1;
			}
		});
	};

	public goArticulo(link, index) {
		let Params = new HttpParams
		Params = Params.append( 'idUsuario', this.idUsuario );
		Params = Params.append( 'idEnlace', link.idEnlace );
		this._http.get( this.urlAddView, { params: Params } ).subscribe(data => {
			if( data[0].success == 1 ){
				this.favoritos[index]['vistos'] = this.favoritos[index]['vistos'] + 1;
				const browser = this.iab.create(link.URL);
				
				browser.on('loadstop');
			};
		});
	};

	trackByFav(index) {
		return index;
	};

	starLess(categoria, index) {
		let Params = new HttpParams;
		Params = Params.append('idUsuario', this.idUsuario);
		Params = Params.append('idEnlace', categoria.idEnlace);

		this._http.get(this.urlLessFav, { params: Params }).subscribe(data => {
			if (data[0].success == 1) {
				const toast = this.toastCtrl.create({
					message: 'Se elimino de favoritos',
					duration: 2000
				});
				toast.present();
				this.getFavoritos();
			};
		});
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

};
