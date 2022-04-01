import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-depament-list',
  templateUrl: './depament-list.component.html',
  styleUrls: ['./depament-list.component.css']
})
export class DepamentListComponent implements OnInit {
  private subs = new SubSink();
  pos = 0;
  tableCount = 10;
  searchValue = '';

  depamentInfoList: {
    createDate: string;
    dpDsc: string;
    dpId: string;
    dpTitel: string;
  }[] = [];

  masterDepamentInfoList: {
    createDate: string;
    dpDsc: string;
    dpId: string;
    dpTitel: string;
  }[] = [];

  constructor(private api :ApiService) { }

  ngOnInit(): void {
    this.loadDepamentInfo();
  }

  loadDepamentInfo(): void{
    this.subs.sink = this.api.loadAllDepamentInfo('listAllDepartmentInfo').subscribe(res => {
        this.depamentInfoList = res.data;
        this.masterDepamentInfoList = res.data;
        
    });
  }

  tableCountFunc(): any{
    return (this.depamentInfoList)? this.depamentInfoList.slice(0, this.tableCount) : null;
   }

   deleteFunc(id: string):void{
     console.log(id);
     
    this.subs.sink = this.api.deleteDepamentInfo(id, 'deleteDepartmentInfo').subscribe(res => {
      if(res.status === '1'){
        this.depamentInfoList = this.depamentInfoList.filter(f => f.dpId !== id);
      }
    })
   }


   searchFunc():void{
    if(this.searchValue !== ''){
        this.depamentInfoList =  this.masterDepamentInfoList.filter(f => 
          f.dpTitel.includes(this.searchValue.toLowerCase()) || 
          f.dpDsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.depamentInfoList  =  this.masterDepamentInfoList;
    }
  }


  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.depamentInfoList);
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
    return this.depamentInfoList.length;
  }


}
