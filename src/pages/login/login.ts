import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

//Page Import
import { CategoriasPage } from '../categorias/categorias'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData = {
    usuario: '',
    pass: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  login(){
    this.navCtrl.setRoot( CategoriasPage );
  }

}
