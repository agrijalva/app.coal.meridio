import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CategoriasPage } from '../pages/categorias/categorias';
import { ResultadosPage } from '../pages/resultados/resultados';
import { ArticuloPage } from '../pages/articulo/articulo';
import { ConocenosPage } from '../pages/conocenos/conocenos';
import { SitiosfavPage } from '../pages/sitiosfav/sitiosfav';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { BuscarcatPage } from '../pages/buscarcat/buscarcat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		LoginPage,
		CategoriasPage,
		ResultadosPage,
		ArticuloPage,
		ConocenosPage,
		SitiosfavPage,
		AyudaPage,
		BuscarcatPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
		LoginPage,
		CategoriasPage,
		ResultadosPage,
		ArticuloPage,
		ConocenosPage,
		SitiosfavPage,
		AyudaPage,
		BuscarcatPage
	],
	providers: [
		StatusBar,
		InAppBrowser,
		SocialSharing,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
