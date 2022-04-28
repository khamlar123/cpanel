import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-development-list',
  templateUrl: './development-list.component.html',
  styleUrls: ['./development-list.component.css']
})
export class DevelopmentListComponent implements OnInit {

  pos = 0;
  tableCount = 10;
  searchValue = '';
  assistanceList: {
    asId: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    refId: string;
    title: string;
  }[] = [];

  masterAssistanceList: {
    asId: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    refId: string;
    title: string;
  }[] = [];
  url
  constructor(private api: ApiService, public main: MainService) {
    this.url = this.main.getImgUrl();


  }

  ngOnInit(): void {
    this.loadAssistan();

  }


  loadAssistan():void{
    this.api.loadAllAssistanceUrl('listAllAssistance').subscribe(res => {
      console.log(res);
      this.assistanceList = res.data;
      this.masterAssistanceList = res.data;
    })
  }

  tableCountFunc(): any{
    const fillterItems = (this.assistanceList)? this.assistanceList.slice(0, this.tableCount) : null;
    return fillterItems.filter(f => f.refId === "3");
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.assistanceList =  this.masterAssistanceList.filter(f =>
          f.title.includes(this.searchValue.toLowerCase()) ||
          f.dsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.assistanceList  =  this.masterAssistanceList;
    }
  }

  deleteFunc(id: string):void{
    this.api.deleteAssistanceUrl(id, 'deleteAssistance').subscribe(res => {
      if(res.status === '1'){
        this.assistanceList = this.assistanceList.filter(f => f.asId !== id);
      }
    })
   }

  //  getImgUrl(url: string):string{
  //   let str = JSON.parse(url)[0];
  //   return this.url + str.slice(7, str.length);
  // }


  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.assistanceList.filter(f => f.refId === "3"));
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
    return this.assistanceList.length;
  }

  imgUrl(url: string): string {

    if (url) {
      return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }

}
