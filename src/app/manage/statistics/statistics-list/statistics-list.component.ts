import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  statisticsList: {
    createDate: string;
    refId: string;
    spDsc: string;
    stEngLink: string;
    stId: string;
    stLaoLink: string;
    stTitle: string;
  }[] = [];

  masterStatisticsList: {
    createDate: string;
    refId: string;
    spDsc: string;
    stEngLink: string;
    stId: string;
    stLaoLink: string;
    stTitle: string;
  }[] = [];
  url = ''
  constructor(private api: ApiService, public main: MainService) {
    this.url = this.main.getImgUrl();
  }

  ngOnInit(): void {
    this.loadAssistan();

  }


  loadAssistan():void{
    this.api.loadAllStatistics('listAllStatistics').subscribe(res => {
      console.log(res);
      this.statisticsList = res.data;
      this.masterStatisticsList = res.data;
    })
  }

  tableCountFunc(): any{
    const fillterItems = (this.statisticsList)? this.statisticsList.slice(0, this.tableCount) : null;
    return fillterItems;
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.statisticsList =  this.masterStatisticsList.filter(f =>
          f.stTitle.includes(this.searchValue.toLowerCase()) ||
          f.spDsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.statisticsList  =  this.masterStatisticsList;
    }
  }

  deleteFunc(id: string):void{
    this.api.deleteStatistics(id, 'deleteStatistics').subscribe(res => {
      if(res.status === '1'){
        this.statisticsList = this.statisticsList.filter(f => f.stId !== id);
      }
    })
   }

   imgUrl(url: string): string {

    if (url) {
      return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }

  getName(id : string): string{

    if(id=== "1"){
      return 'ສະຖິຕິພະນັກງານລັດຖະກອນ';
    }
    if(id=== "2"){
      return 'ສະຖິຕິອຸດສາຫະກໍາ ແລະ ຫັດຖະກໍາ';
    }

    if(id=== "3" ){
      return 'ສະຖິຕິການຄ້າພາຍໃນ';
    }

    if(id=== "4" ){
      return 'ສະຖິຕິທະບຽນວິສາຫະກິດ';
    }

    if(id=== "5"){
      return 'ສະຖິຕິນໍາເຂົ້າ ແລະ ສົ່ງອອກ'
    }

    if(id=== "6"){
      return 'ສະຖິຕິວິສາຫະກິດຂະໜາດນ້ອຍ ແລະ ກາງ'
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

    const copyItems = Object.assign([], this.statisticsList.filter(f => f.refId === "1"));
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
    return this.statisticsList.filter(f => f.refId === "1").length;
  }


}
