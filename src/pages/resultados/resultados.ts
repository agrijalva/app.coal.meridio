import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ArticuloPage } from '../articulo/articulo';

@IonicPage()
@Component({
	selector: 'page-resultados',
	templateUrl: 'resultados.html',
})
export class ResultadosPage {

	//Card
	public cards = [{
			icon: 'https://www.google.com/s2/favicons?domain=www.youtube.com',
			link: 'https://ionicframework.com/docs/3.0.0/api/navigation/NavController',
			title: 'Controles predeterminados para los campos Texto largo y Texto corto',
			image: '../../assets/imgs/categorias/anime.jpg',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus aliquam velit, et luctus orci sodales nec. Morbi at libero sed ipsum condimentum congue. Mauris a sapien sit amet libero molestie posuere non non libero. Nullam orci nulla, pretium id facilisis et, semper nec tortor. Fusce non auctor nulla.',
			star: 6,
			view: 180
		},
		{
			icon: 'https://www.google.com/s2/favicons?domain=www.youtube.com',
			link: 'https://ionicframework.com/docs/api/components/grid/Grid',
			title: 'Controles predeterminados para los campos Texto largo y Texto corto',
			image: '../../assets/imgs/categorias/anime.jpg',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus aliquam velit, et luctus orci sodales nec. Morbi at libero sed ipsum condimentum congue. Mauris a sapien sit amet libero molestie posuere non non libero. Nullam orci nulla, pretium id facilisis et, semper nec tortor. Fusce non auctor nulla.',
			star: 78,
			view: 200
		},
		{
			icon: 'https://www.google.com/s2/favicons?domain=www.youtube.com',
			link: 'https://archive.org/details/TheyDiedWithTheirBootsOn_201706',
			title: 'Controles predeterminados para los campos Texto largo y Texto corto',
			image: '',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus aliquam velit, et luctus orci sodales nec. Morbi at libero sed ipsum condimentum congue. Mauris a sapien sit amet libero molestie posuere non non libero. Nullam orci nulla, pretium id facilisis et, semper nec tortor. Fusce non auctor nulla.',
			star: 1,
			view: 10
		}
	];
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ResultadosPage');
	}

	public goArticulo(link){
		this.navCtrl.push( ArticuloPage, {link: link} );
	}

}
