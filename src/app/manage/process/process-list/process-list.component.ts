import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {
  private subs = new SubSink();
  processList: any[] =[];
  masterProcessList: any[] =[];
  pos = 0;
  pageNumber = 1;
  tableCount = 10;
  searchValue = '';
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.subs.sink = this.api.getProcess('listAllProcess').subscribe(res => {
      this.processList = res.data;
    })
  }

  tableCountFunc(): any{
    return (this.processList)? this.processList.slice(0, this.tableCount) : null;
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.processList =  this.masterProcessList.filter(f => 
          f.prTitle.includes(this.searchValue.toLowerCase()) || 
          f.prDsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.processList  =  this.masterProcessList;
    }
  }

  deleteFunc(id: string):void{
    this.subs.sink = this.api.deleteProcess( 'deleteProcess',id).subscribe(res => {
      if(res.status === '1'){
        this.processList = this.processList.filter(f => f.prId !== id);
      }
    })
   }


    changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.processList.filter(f => f.refId === "1"));
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
    return this.processList.filter(f => f.refId === "1").length;
  }

}
