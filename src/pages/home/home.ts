import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FootballPage } from "../football/football";
import { HandballPage } from "../handball/handball";
import { IcehockeyPage } from "../icehockey/icehockey";
import { BasketballPage } from "../basketball/basketball";
import { AccountingPage } from "../accounting/accounting";
import { OtherPage } from "../other/other";
import { BetsPage } from '../bets/bets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  menuButtonClicked(button){
    let page;
    switch(button){
      case 1: page = FootballPage
        break;
      case 2: page = HandballPage;
        break;
      case 3: page = IcehockeyPage
        break;
      case 4: page = BasketballPage
        break;
      case 5: page = AccountingPage
        break;
      case 6: page = BetsPage;
        break;
    }
    if (page){
      this.navCtrl.push(page);
    }
  }
    

}
