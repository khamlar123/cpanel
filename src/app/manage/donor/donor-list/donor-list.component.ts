import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  url = `http://216.127.173.163/`;
  donorList: {
    donor_id: string;
    dsc: string;
    imgUrl: string;
    orderIndex: string;
    title: string;
  }[] = [];

  masterDonor: {
    donor_id: string;
    dsc: string;
    imgUrl: string;
    orderIndex: string;
    title: string;
  }[] = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadDonor();
  }


  loadDonor():void{
    this.api.loadAllDonor('listAllDonor').subscribe(res => {
      console.log(res);
      this.donorList = res.data;
      this.masterDonor = res.data;
    })
  }

  tableCountFunc(): any {
    const fillterItems = (this.donorList) ? this.donorList.slice(0, this.tableCount) : null;
    return fillterItems;
  }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.donorList = this.masterDonor.filter(f =>
        f.title.includes(this.searchValue.toLowerCase()) ||
        f.dsc.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.donorList = this.masterDonor;
    }
  }

  deleteFunc(id: string): void {
    this.api.deleteDonor(id, 'deleteDonor').subscribe(res => {
      if (res.status === '1') {
        this.donorList = this.donorList.filter(f => f.donor_id !== id);
      }
    });
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

    const copyItems = Object.assign([], this.donorList);
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
    return this.donorList.length;
  }

}
