import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {
    public categorias = [
        {
            img: '../../assets/imgs/categorias/sov.jpg',
            title: 'IMAGENES SOVIETICAS'
        },
        {
            img: '../../assets/imgs/categorias/anime.jpg',
            title: 'ANIME'
        },
        {
            img: '../../assets/imgs/categorias/caricaturas.jpg',
            title: 'CARICATURAS'
        },
        {
            img: '../../assets/imgs/categorias/chiche.jpg',
            title: 'HISTORIA'
        },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CategoriasPage');
    }

    goFiltro() {
        this.navCtrl.push(HomePage);
    }

}
