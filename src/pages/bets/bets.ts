import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from "chart.js";

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html',
})
export class BetsPage {

  totalEarnings;
  totalStakes;
  roi;
  roiAggregate;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  addExpanded = false;
  bets = [];
  event = "";
  selection = "";
  stake = null;
  odds = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {



  }

  ionViewDidLoad() {
    this.storage.get("bets").then(value => {
      this.bets = value
      this.calculate()
      this.aggregateRoi()
    
    

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["","","","","","","",""],
        datasets: [
          {
            label: "ROI",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.roiAggregate,
            spanGaps: false,
          }
        ]
      }

    });
  })
  }

  toggleAdd() {
    this.addExpanded = !this.addExpanded
  }

  addBet() {
    if (this.event != "" && this.selection != "" && this.stake > 0 && this.odds > 0) {
      this.bets.unshift(
        { event: this.event, selection: this.selection, stake: this.stake, odds: this.odds }
      )
      this.addExpanded = false
      this.event = ""
      this.selection = ""
      this.stake = null
      this.odds = null
      this.calculate()
      this.storage.set("bets", this.bets)
    }

  }

  removeBet(bet) {
    for (let bet2 of this.bets) {
      if (bet == bet2) {
        delete this.bets[this.bets.indexOf(bet2)]
        this.calculate()
        this.storage.set("bets", this.bets)
      }
    }
  }

  betWon(bet) {
    this.bets[this.bets.indexOf(bet)].completed = true
    this.bets[this.bets.indexOf(bet)].won = true
    this.calculate()
    this.storage.set("bets", this.bets)
  }

  betLost(bet) {
    this.bets[this.bets.indexOf(bet)].completed = true
    this.bets[this.bets.indexOf(bet)].won = false
    this.calculate()
    this.storage.set("bets", this.bets)
  }

  calculate() {
    let totalEarnings = 0;
    let totalStakes = 0;
    for (let bet of this.bets) {
      if (bet && bet.completed) {
        bet.won ? totalEarnings += parseFloat(bet.stake) * parseFloat(bet.odds) : totalEarnings -= parseFloat(bet.stake)
        totalStakes += parseFloat(bet.stake)
      }
    }
    if (totalStakes > 0) {
      this.roi = 100 * (totalEarnings / totalStakes) - 100
      this.totalStakes = totalStakes
      this.totalEarnings = totalEarnings - totalStakes
    }
    else {
      this.roi = null;
      this.totalStakes = null;
      this.totalEarnings = null;
    }

  }

  aggregateRoi(){
    let aggregate = []
    console.log("aggregatin'")
    console.log(this.bets)
    console.log(this.bets.length)
    for (let i = this.bets.length - 1; i >= 0; i-- ){
      console.log(i)
      let totalEarnings = 0;
      let totalStakes = 0;
      for (let j = this.bets.length - 1 ; j >= i; j--){
        let bet = this.bets[j]
        if (bet && bet.completed) {
          if (bet.won){ totalEarnings += parseFloat(bet.stake) * parseFloat(bet.odds) }
          if (!bet.won) { totalEarnings -= parseFloat(bet.stake) }
          totalStakes += parseFloat(bet.stake)
        }
      }
      if (this.bets[i].completed){
        aggregate.push(100 * (totalEarnings / totalStakes) - 100)
      }
      console.log("aggregate: ",aggregate)
    }
    this.roiAggregate = aggregate
  }

  clearStorage(){
    this.bets = []
    this.storage.set("bets", [])
  }


}
