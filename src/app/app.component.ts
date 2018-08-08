import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CategoriasPage } from '../pages/categorias/categorias';
import { ConocenosPage } from '../pages/conocenos/conocenos';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { SitiosfavPage } from '../pages/sitiosfav/sitiosfav';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	public usuarioNombre: any = '';
	rootPage: any = LoginPage;

	pages: Array<{ title: string, component: any }>;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public events: Events) {
		this.initializeApp();
		events.subscribe('userName', (nombre) => {
			this.usuarioNombre = nombre;
		});
		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Conócenos', component: ConocenosPage },
			{ title: 'Categorias', component: CategoriasPage },
			{ title: 'Filtros', component: HomePage },
			{ title: 'Mis sitios favoritos', component: SitiosfavPage },
			{ title: 'Ayuda', component: AyudaPage },
			{ title: 'Cerrar Sesion', component: LoginPage }
		];

	};

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		if (page.title == 'Cerrar Sesion') {
			localStorage.removeItem('login');
			localStorage.setItem('login', '0');
			localStorage.removeItem( 'nameUser' );
			this.nav.push(page.component);
		} else {
			this.nav.push(page.component);
		}
	}
}
