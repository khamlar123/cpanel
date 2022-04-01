import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-product-tea-list',
  templateUrl: './product-tea-list.component.html',
  styleUrls: ['./product-tea-list.component.css']
})
export class ProductTeaListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  url: any;

  productTeaList: {
    teaId: string;
    teaDsc: string;
    teaTitle: string;
    teacLogo: string;
    videoLink: string;
    createDate: string;
  }[] = [];

  masterProductTeaList: {
    teaId: string;
    teaDsc: string;
    teaTitle: string;
    teacLogo: string;
    videoLink: string;
    createDate: string;
  }[] = [];
  constructor(private api: ApiService, private main: MainService) {
    this.url = this.main.getEnpoin();
  }

  ngOnInit(): void {
    this.loadProductTea();
  }

  loadProductTea(): void {
    this.api.loadProductTea('listAllProductTea').subscribe(res => {
      if (res.status === "1") {
        this.productTeaList = res.data;
        this.masterProductTeaList = res.data;
      }
    })
  }

  tableCountFunc(): any {
    const fillterItems = (this.productTeaList) ? this.productTeaList.slice(0, this.tableCount) : null;
    return fillterItems;
  }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.productTeaList = this.masterProductTeaList.filter(f =>
        f.teaTitle.includes(this.searchValue.toLowerCase()) ||
        f.teaDsc.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.productTeaList = this.masterProductTeaList;
    }
  }

  deleteFunc(id: string): void {

    this.api.deleteProductTea(id, 'deleteProductTea').subscribe(res => {
      if (res.status === '1') {
        this.productTeaList = this.productTeaList.filter(f => f.teaId !== id);
      }
    });
  }


  imgUrl(url: string): string {

    if (url) {
      const str = (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);

      return str.slice(7, str.length);
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

    const copyItems = Object.assign([], this.productTeaList);
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
    return this.productTeaList.length;
  }

}
