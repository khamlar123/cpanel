import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent implements OnInit {
  
  pos = 0;
  tableCount = 10;
  searchValue = '';
  assistanceList: {
    agent: string;
    asId: string;
    assisType: string;
    budgetAnother: string;
    budgetEIF: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    recipient: string;
    refId: string;
    time: string;
    title: string;
    totalPrice: string;
  }[] = [];

  masterAssistanceList: {
    agent: string;
    asId: string;
    assisType: string;
    budgetAnother: string;
    budgetEIF: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    recipient: string;
    refId: string;
    time: string;
    title: string;
    totalPrice: string;
  }[] = [];
  url = '';
  constructor(private api: ApiService, public main: MainService) { 
    this.url = this.main.getEnpoin();
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
    return fillterItems.filter(f => f.refId === "1");
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

   getImgUrl1(url: string): string {
    if (url) {
      return JSON.parse(url)[0] ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return '';
    }
  }


  getImgUrl(): string {
    return this.url.split('/backend')[0];
  }


  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.assistanceList.filter(f => f.refId === "1"));
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

}
