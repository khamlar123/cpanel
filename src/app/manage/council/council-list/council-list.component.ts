import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-council-list',
  templateUrl: './council-list.component.html',
  styleUrls: ['./council-list.component.css']
})
export class CouncilListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  url: any;

  councilList: {
    cou_id: string;
    createDate: string;
    doc: string;
    title: string;
  }[] = [];

  masterCouncilList: {
    cou_id: string;
    createDate: string;
    doc: string;
    title: string;
  }[] = []
  constructor(private api: ApiService, private main: MainService) {
    this.url = this.main.getEnpoin();
  }

  ngOnInit(): void {
    this.loadAllLaw();
  }

  loadAllLaw(): void {
    this.api.loadAllCouncil('listAllCouncil').subscribe(res => {
      if (res.status === '1') {
        this.councilList = res.data;
        this.masterCouncilList = res.data;
      }
    });
  }

  tableCountFunc(): any {
    const fillterItems = (this.councilList) ? this.councilList.slice(0, this.tableCount) : null;
    return fillterItems;
  }

  searchFunc(): void {
    if (this.searchValue !== '') {
      this.councilList = this.masterCouncilList.filter(f =>
        f.title.includes(this.searchValue.toLowerCase()) ||
        f.doc.includes(this.searchValue.toLowerCase())
      );
    } else {
      this.councilList = this.masterCouncilList;
    }
  }

  deleteFunc(id: string): void {
    this.api.deleteCouncil(id, 'deleteCouncil').subscribe(res => {
      if (res.status === '1') {
        this.councilList = this.councilList.filter(f => f.cou_id !== id);
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

    const copyItems = Object.assign([], this.councilList);
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
    return this.councilList.length;
  }

}
