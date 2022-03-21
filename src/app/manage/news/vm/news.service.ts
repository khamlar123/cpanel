import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsId = -1;

  newsList : any[] = [];
  masterNew : any[] =[];
  newsDetail: any ={
    cover_id: 0,
    dsc: "",
    imgUrl: "",
    news_id: 0,
    title: "",
    web_id: 1,
    youtubeLink: ""
  };

  constructor() { }

  setNewsList(nsl):void{
    this.newsList = [];
    this.newsList = nsl;
    this.masterNew = nsl;
  }

  setDetail(dt): void{
    this.newsDetail = dt;
  }

  resetModal():void{
    const modal = {
      cover_id: 0,
      dsc: "",
      imgUrl: "",
      news_id: 0,
      title: "",
      web_id: 0,
    }

    this.newsDetail = modal;
  }

}
