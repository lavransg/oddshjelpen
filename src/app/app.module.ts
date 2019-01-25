import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FootballPage } from "../pages/football/football";
import { HandballPage } from "../pages/handball/handball";
import { IcehockeyPage } from "../pages/icehockey/icehockey";
import { BasketballPage } from "../pages/basketball/basketball";
import { AccountingPage } from "../pages/accounting/accounting";
import { OtherPage } from "../pages/other/other";

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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
