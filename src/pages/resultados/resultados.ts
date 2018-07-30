import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ArticuloPage } from '../articulo/articulo';

@IonicPage()
@Component({
	selector: 'page-resultados',
	templateUrl: 'resultados.html',
})
export class ResultadosPage {

	public enlacesGet: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.getEnlaces();
	};

	private getEnlaces(){
		this.enlacesGet = this.navParams.get('enlaces');
		console.log( 'enlacesGet', this.enlacesGet );
	};

	public goArticulo(link){
		this.navCtrl.push( ArticuloPage, {link: link} );
	};

}
