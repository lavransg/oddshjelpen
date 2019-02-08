import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html',
})
export class BetsPage {

  totalEarnings;
  totalStakes;
  roi;

  addExpanded = false;
  bets = [];
  event = "";
  selection = "";
  stake = null;
  odds = null;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  
  
  }

  componentDidMount(){
    this.calculate()
  }

  toggleAdd(){
    this.addExpanded = !this.addExpanded
  }

  addBet(){
    console.log("adding bet",this.event, this.selection, this.stake, this.odds)
    if (this.event != "" && this.selection != "" && this.stake > 0 && this.odds > 0){
      console.log("adding bet 2")
      this.bets.unshift(
        {event: this.event, selection: this.selection, stake: this.stake, odds: this.odds}
      )
      this.addExpanded = false
      this.event = ""
      this.selection = ""
      this.stake = null
      this.odds = null
      this.calculate()
    }
    
  }

  removeBet(bet){
      if ( this.bets.indexOf(bet) ){
        delete this.bets[this.bets.indexOf(bet)]
        this.calculate()
      }
  }

  betWon(bet){
    this.bets[this.bets.indexOf(bet)].completed = true
    this.bets[this.bets.indexOf(bet)].won = true
    this.calculate()
  }

  betLost(bet){
    this.bets[this.bets.indexOf(bet)].completed = true
    this.bets[this.bets.indexOf(bet)].won = false
    this.calculate()
  }

  calculate(){
    let totalEarnings = 0;
    let totalStakes = 0;
    for (let bet of this.bets){
      if (bet.completed){
        bet.won ? totalEarnings += parseFloat(bet.stake) * parseFloat(bet.odds) : totalEarnings -= parseFloat(bet.stake)
        totalStakes += parseFloat(bet.stake)
      }
    }
    console.log("totalstakes:",totalStakes)
    if (totalStakes > 0){
      this.roi = 100 * (totalEarnings / totalStakes) - 100
      this.totalStakes = totalStakes
      this.totalEarnings = totalEarnings - totalStakes
    }

  }


}
