import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { publish } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { VmService } from '../vm/vm.service';
import { BannerApiService } from '../api/banner-api.service';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {
  private subs = new SubSink();
  url = ``;
  pos = 0;
  pageNumber = 1;
  tableCount = 10;

  constructor(
    private router : Router,
    private api : BannerApiService,
    public vm : VmService,
    public main: MainService
  ) {
    this.url = this.main.getImgUrl();
   }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if(token === null){
      alert('plese login');
      this.router.navigate(['/login']);
    }
    this.loadBannerList();
  }

  loadBannerList():void{
    this.subs.sink =  this.api.banner('listAllBanner').subscribe(res => {
      if(res.status > 0){
        this.vm.bannerList = this.sorting(res.data, 'bann_id') ;
      }
    })
  }



  sorting(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }

  deleteFunc(id: string):void{
    if(confirm("Are you sure to delete banner_id"+' '+id)) {

      this.subs.sink = this.api.deleteBanner(id, 'deleteBanner').subscribe(res => {
        if(res.status > 0){
          this.vm.bannerList = this.vm.bannerList.filter(f => f.bann_id !== id);
        }
      },err => console.log(err),
      () => {

      }
      )
    }

  }

  tableCountFunc(): any{
    return (this.vm.bannerList)? this.vm.bannerList.slice(0, this.tableCount) : null;
   }

   changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.vm.bannerList.filter(f => f.ref_id === "2"));
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
    return this.vm.bannerList.filter(f => f.ref_id === "2").length;
  }


  imgUrl(url: string): string {

    if (url) {
      return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }

}
