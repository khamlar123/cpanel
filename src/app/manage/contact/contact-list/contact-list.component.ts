import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private subs = new SubSink();
  contactList: any[] =[];
  masterContact: any[] =[];
  pos = 0;
  pageNumber = 1;
  tableCount = 10;
  searchValue = '';
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.subs.sink = this.api.getContact('listAllDepartmentContact').subscribe(res => {
      this.contactList = res.data;
      
    })
  }

  tableCountFunc(): any{
    return (this.contactList)? this.contactList.slice(0, this.tableCount) : null;
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.contactList =  this.masterContact.filter(f => 
          f.dpcTitle.includes(this.searchValue.toLowerCase()) || 
          f.dpcDsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.contactList  =  this.masterContact;
    }
  }

  deleteFunc(id: string):void{
    
   this.subs.sink = this.api.deleteContact('deleteDepartmentContact',id).subscribe(res => {
     if(res.status === '1'){
       this.contactList = this.contactList.filter(f => f.dpcId !== id);
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

    const copyItems = Object.assign([], this.contactList);
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
    return this.contactList.length;
  }

}
