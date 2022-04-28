import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';
import { NewsService } from '../vm/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  pos = 0;
  searchValue = '';
  tableCount = 10
  url = '';
  constructor(
    public api : ApiService,
    public vm : NewsService,
    private router : Router,
    public main : MainService,
  
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if(token === null){
      alert('plese login');
      this.router.navigate(['/login']);
    }
    this.loadNews();
  }

  loadNews():void{
    var  method = 'listAllNews';
    this.api.getNews(method).subscribe(res => {
      this.vm.setNewsList(res.data);
    })
  }

  getImgUrl(url: string):string{
    if(url){
      return (JSON.parse(url)[0])?JSON.parse(url)[0]: JSON.parse(url);
    }else{
      return url
    }
    
  }

  deleteNews(id:string):void{
    if(confirm("ທ່ານແນ່ໃຈບໍ່ວ່າລຶບຂ່າວລະຫັດ"+' '+id)) {
  
      const method = 'deleteNews'
      this.api.deleteNew(method, id).subscribe(res => {
        if(res.status > 0){
         this.vm.setNewsList(this.vm.newsList.filter(f => f.news_id !== id));
        }
      },err => console.log(err),
      () => {
    
      }
      )
    }

    this.vm.newsId = -1;

  }


  tableCountFunc(): any{
    return (this.vm.newsList)? this.vm.newsList.slice(0, this.tableCount) : null;
   }


   searchFunc():void{
    if(this.searchValue !== ''){
        this.vm.newsList =  this.vm.masterNew.filter(f => 
          f.web_id.includes(this.searchValue) || 
          f.title.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.vm.newsList =  this.vm.masterNew;
    }
  }

  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.vm.newsList);
    if (copyItems.length > 9) {
      dataList = copyItems.splice(this.pos * this.tableCount, this.tableCount);
    } else {
      dataList = copyItems;
    }
    return of(dataList);
  }

  update(o){
    this.pos = o;
  }

  getCountItems():number{
    return this.vm.newsList.length;
  }

}
