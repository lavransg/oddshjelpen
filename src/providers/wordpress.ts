import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import 'rxjs/Rx';

@Injectable()
export class WordpressProvider {

  constructor(public http: HttpClient) {
    
  }

  getRecentPosts(categoryId:number, page:number = 1) {
    
    let category_url = categoryId ? ("&categories=" + categoryId) : "";
  
    return this.http.get("https://oddshjelpen.com/wp-json/wp/v2/posts?page=" + page + category_url)
  }

}
