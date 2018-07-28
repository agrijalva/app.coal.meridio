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
	}

	public goArticulo(link){
		console.log( link );
		this.navCtrl.push( ArticuloPage, {link: link} );
	}

	private getEnlaces(){
		this.enlacesGet = this.navParams.get('enlaces');
	}

}
