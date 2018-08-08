import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@IonicPage()
@Component({
	selector: 'page-articulo',
	templateUrl: 'articulo.html',
})
export class ArticuloPage {
	private link: SafeResourceUrl = '';
	constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
		this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('link'));
	}

	ionViewDidLoad() {
	}

}
