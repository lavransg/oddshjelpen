import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient, HttpClientModule } from "@angular/common/http"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FootballPage } from "../pages/football/football";
import { HandballPage } from "../pages/handball/handball";
import { IcehockeyPage } from "../pages/icehockey/icehockey";
import { BasketballPage } from "../pages/basketball/basketball";
import { AccountingPage } from "../pages/accounting/accounting";
import { OtherPage } from "../pages/other/other";
import { PostPage } from "../pages/post/post";

import { WordpressProvider } from '../providers/wordpress';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FootballPage,
    HandballPage,
    IcehockeyPage,
    BasketballPage,
    AccountingPage,
    OtherPage,
    PostPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FootballPage,
    HandballPage,
    IcehockeyPage,
    BasketballPage,
    AccountingPage,
    OtherPage,
    PostPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WordpressProvider,
  ]
})
export class AppModule {}
