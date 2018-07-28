import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-buscarcat',
	templateUrl: 'buscarcat.html',
})
export class BuscarcatPage {

	public subTitle: string;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.subTitle = this.navParams.get('sendCat').categoria;
	}

}
