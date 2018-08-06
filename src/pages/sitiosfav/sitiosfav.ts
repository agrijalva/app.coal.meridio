import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClient, HttpParams, } from '@angular/common/http';

@IonicPage()
@Component({
	selector: 'page-sitiosfav',
	templateUrl: 'sitiosfav.html',
})
export class SitiosfavPage {

	//private url: string = 'http://coal.com.mx:1100';
	private url: string = 'http://localhost:1100';
	public idUsuario: any = 1;
	public showDiv: number = 0;
	public favoritos: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _http: HttpClient,
		private alertCtrl: AlertController,
		private socialSharing: SocialSharing,
		public actionSheetCtrl: ActionSheetController) {
	}

	private urlGetFav = this.url + '/api/actividad/favoritoUsuario/';
	private urlLessFav = this.url + '/api/actividad/favoritoRemove/';

	ionViewDidLoad() {
		this.getFavoritos();
	}

	private getFavoritos(){
		let Params = new HttpParams;
		Params = Params.append( 'idUsuario', this.idUsuario );

		this._http.get( this.urlGetFav, { params: Params } ).subscribe(data =>{
			this.favoritos = data;
			if( this.favoritos.length > 0 ){
				this.showDiv = 1;
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
				this.favoritos[index]['guardado'] = 0;
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

}
