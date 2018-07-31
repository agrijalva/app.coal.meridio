import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { ArticuloPage } from '../articulo/articulo';

@IonicPage()
@Component({
	selector: 'page-resultados',
	templateUrl: 'resultados.html',
})
export class ResultadosPage {

	public enlacesGet: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private iab: InAppBrowser, 
		public actionSheetCtrl: ActionSheetController,
		private socialSharing: SocialSharing) {}

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
		console.log( 'catregoria', categoria );
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Compartir',
			buttons: [
				{
					text: 'Facebook',
					icon: 'logo-facebook',
					handler: () => {
						this.socialSharing.shareViaFacebook( 'Este contenido te puede interesar... ' + categoria.titulo , null, 'http://coal.com.mx:1100/#/' + categoria.idEnlace );
					}
				}, {
					text: 'WhatsApp',
					icon: 'logo-whatsapp',
					handler: () => {
						this.socialSharing.shareViaWhatsApp( 'Este contenido te puede interesar... ' + categoria.titulo  , null, 'http://coal.com.mx:1100/#/' + categoria.idEnlace);
					}
				}, {
					text: 'Twitter',
					icon: 'logo-twitter',
					handler: () => {
						this.socialSharing.shareViaTwitter( 'Este contenido te puede interesar... ' + categoria.titulo  , null, 'http://coal.com.mx:1100/#/' + categoria.idEnlace);
					}
				},{
					text: 'Compartir',
					icon: 'md-share',
					handler: () => {
						this.socialSharing.share( 'Este contenido te puede interesar... ' + categoria.titulo  , null, null, 'http://coal.com.mx:1100/#/' + categoria.idEnlace);
					}
				},{
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

}
