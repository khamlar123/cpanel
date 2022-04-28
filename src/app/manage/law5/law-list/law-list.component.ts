import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-law-list',
  templateUrl: './law-list.component.html',
  styleUrls: ['./law-list.component.css']
})
export class LawListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  url: any;

  lawList: {
    docId: string;
    title: string;
    doc: string;
    fileEn: string;
    fileLa: string;
    createDate: string;
    refId: string;
    dsc: string;
  }[] = [];

  masterLawList: {
    docId: string;
    title: string;
    doc: string;
    fileEn: string;
    fileLa: string;
    createDate: string;
    refId: string;
    dsc: string;
  }[] = [];

  constructor(private api: ApiService, private main: MainService) {
    this.url = this.main.getImgUrl();
  }

  ngOnInit(): void {
    this.loadAllLaw();
  }

  loadAllLaw(): void {
    this.api.loadAllLaw('listAllDocuments').subscribe(res => {
      if (res.status === '1') {
        this.lawList = res.data;
        this.masterLawList = res.data;
      }
    });
  }

  tableCountFunc(): any {
    const fillterItems = (this.lawList) ? this.lawList.slice(0, this.tableCount) : null;
    return fillterItems;
  }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.lawList = this.masterLawList.filter(f =>
        f.title.includes(this.searchValue.toLowerCase()) ||
        f.dsc.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.lawList = this.masterLawList;
    }
  }

  deleteFunc(id: string): void {
    this.api.deleteLaw(id, 'deleteDocuments').subscribe(res => {
      if (res.status === '1') {
        this.lawList = this.lawList.filter(f => f.docId !== id);
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

  getname(id: string): string {
    if (id === "1") {
      return 'ກົດຫມາຍ';
    }

    if (id === "2") {
      return 'ດໍາລັດ'
    }

    if (id === "3") {
      return 'ຄໍາສັ່ງ';
    }

    if (id === "4") {
      return 'ຄໍາແນະນໍາ ຫຼື ບົດແນະນໍາ';
    }

    if (id === "5") {
      return 'ຂໍ້ຕົກລົງ'
    }

    if (id === "6") {
      return 'ແຈ້ງການ'
    }
    return '';
  }

  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.lawList.filter(f => f.refId === "5"));
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
    return this.lawList.filter(f => f.refId === "5").length;
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


}
