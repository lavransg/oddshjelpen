import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordpressProvider } from "../../providers/wordpress";
import { PostPage } from "../post/post";

@Component({
  selector: 'page-basketball',
  templateUrl: 'basketball.html',
})
export class BasketballPage {

  posts: any = []
  morePagesAvailable: boolean;
  categoryId: number = 1373;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    
    this.wordpress.getRecentPosts(this.categoryId)
    .subscribe(data => {
      for(let post in data){
        this.posts.push(data[post])
        console.log(data[post])
      }
    });

  }

  ionViewDidEnter() {
    this.morePagesAvailable = true;
  }

  postTapped(event, post) {
    this.navCtrl.push(PostPage, {
      item: post
    });
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;
  
    this.wordpress.getRecentPosts(this.categoryId, page)
    .subscribe(data => {
      for(let post in data){
        if(!loading){
          infiniteScroll.complete();
          }
        data[post].excerpt.rendered = data[post].excerpt.rendered.split('<a')[0] + "</p>";
        console.log()
        this.posts.push(data[post]);
        loading = false;
        }
      }, err => {
      this.morePagesAvailable = false;
    })
  }

}
