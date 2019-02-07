import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html',
})
export class BetsPage {

  addExpanded = false;
  bets = [];
  event;
  selection;
  stake;
  odds;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  
  
  }

  toggleAdd(){
    this.addExpanded = !this.addExpanded
  }

  addBet(){
    console.log("adding bet")
    if (this.event & this.selection & this.stake & this.odds){
      this.bets.push(
        {event: this.event, selection: this.selection, stake: this.stake, odds: this.odds}
      )
      this.addExpanded = false
      this.event = ""
      this.selection = ""
      this.stake = ""
      this.odds = ""
    }
    
  }

  removeBet(bet){
    for (let bet2 of this.bets){
      if ( this.bets.indexOf(bet) ){
        delete this.bets[this.bets.indexOf(bet)]
      }
    }
  }

  calculate(){
    let before = 0
    let after = 0
    for (let bet in this.bets){

    }
    return []
  }


}
