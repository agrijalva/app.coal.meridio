import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
	selector: 'page-conocenos',
	templateUrl: 'conocenos.html',
})
export class ConocenosPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private screenOrientation: ScreenOrientation) {
	}

	ionViewDidLoad() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
	}

}
