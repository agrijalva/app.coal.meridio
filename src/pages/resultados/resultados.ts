import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ArticuloPage } from '../articulo/articulo';

@IonicPage()
@Component({
	selector: 'page-resultados',
	templateUrl: 'resultados.html',
})
export class ResultadosPage {

	public enlacesGet: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public actionSheetCtrl: ActionSheetController) {
	}

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

	share() {
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Compartir',
			buttons: [
				{
					text: 'Facebook',
					icon: 'logo-facebook',
					role: 'destructive',
					handler: () => {
						console.log('Destructive clicked');
					}
				}, {
					text: 'WhatsApp',
					icon: 'logo-whatsapp',
					handler: () => {
						console.log('Archive clicked');
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

}
