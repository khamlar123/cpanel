import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  tableCount = 10;
  searchValue = '';
  url: any;
  pos = 0;
  orgList: {
    createDate: string;
    name: string;
    org_id: string;
    parent: string;
    stId: string;
    type: string;
    imgUrl: string;
  }[] = [];
  masterOrg: {
    createDate: string;
    name: string;
    org_id: string;
    parent: string;
    stId: string;
    type: string;
    imgUrl: string;
  }[] = [];
  constructor(private api: ApiService, private main: MainService) {
    this.url = this.main.getEnpoin();
  }

  ngOnInit(): void {
    this.loadOrg();

  }

  loadOrg(): void {
    this.api.loadAllStructures('listAllStructures').subscribe(res => {
      if (res.status === '1') {
        this.orgList = res.data;
        this.masterOrg = res.data;
      }
    });
  }

  


  // tableCountFunc(): any {
  //   const fillterItems = (this.orgList) ? this.orgList.slice(0, this.tableCount) : null;
  //   return fillterItems.filter(f => f.org_id === "1");
  // }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.orgList = this.masterOrg.filter(f =>
        f.name.includes(this.searchValue.toLowerCase()) ||
        f.type.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.orgList = this.masterOrg;
    }
  }

  deleteFunc(id: string): void {
    this.api.deleteStructures(id, 'deleteStructures').subscribe(res => {
      if (res.status === '1') {
        this.orgList = this.orgList.filter(f => f.stId !== id);
      }
    });
  }

  getImgUrl(url: string): string {
    if(url !== null){
      const str = JSON.parse(url)[0];

      if (JSON.parse(url)[0] === null) {
        return '';
      }
  
      return this.url + str.slice(7, str.length);
    }

    return '';
  
  }


  imgUrl(url: string): string {

    if (url) {
      return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }

  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.orgList.filter(f => f.org_id === "1"));
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
    return this.orgList.filter(f => f.org_id === "1").length;
  }

}
