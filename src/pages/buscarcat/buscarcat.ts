import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpParams, } from '@angular/common/http';


@IonicPage()
@Component({
	selector: 'page-buscarcat',
	templateUrl: 'buscarcat.html',
})
export class BuscarcatPage {

	public subTitle: string;
	constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient) {
	}

	ionViewDidLoad() {
		this.subTitle = this.navParams.get('sendCat').categoria;
	}

	search(busqueda: string) { 
        console.log(busqueda); 
    }

}
