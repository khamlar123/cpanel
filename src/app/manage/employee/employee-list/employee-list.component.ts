import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pos = 0;
  searchValue = '';
  tableCount = 10
  EmployeeData: {
    createDate: string;
    emAddress: string;
    emId: string;
    emJoinDate: string;
    emLastName: string;
    emName: string;
    emPhone: string;
    emPosition: string;
    businessType : string;
}[] = [];

masterEmployeeData: {
  createDate: string;
  emAddress: string;
  emId: string;
  emJoinDate: string;
  emLastName: string;
  emName: string;
  emPhone: string;
  emPosition: string;
  businessType : string;
}[] = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee():void{

    this.api.getEmployee('listAllEmployee').subscribe(res => {
      console.log(res);
      this.EmployeeData  = res.data;
      this.masterEmployeeData = res.data;
    })
  }

  deleteFun(id:string):void{
    if(confirm("ທ່ານແນ່ໃຈບໍ່ວ່າລຶບຂ່າວລະຫັດ"+' '+id)) {
  
      const method = 'deleteEmployee'
      this.api.deleteEmployee(method, id).subscribe(res => {
        if(res.status > 0){
        this.EmployeeData = this.EmployeeData.filter(f => f.emId !== id);
        }
      },err => console.log(err),
      () => {
    
      }
      )
    }


  }

  tableCountFunc(): any{
    return (this.EmployeeData)? this.EmployeeData.slice(0, this.tableCount) : null;
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.EmployeeData =  this.masterEmployeeData.filter(f => 
          f.emName.includes(this.searchValue.toLowerCase()) || 
          f.emPosition.includes(this.searchValue.toLowerCase()) || 
          f.emLastName.includes(this.searchValue.toLowerCase()) ||
          f.emPhone.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.EmployeeData =  this.masterEmployeeData;
    }
  }

  changeTableRow(po: number):void{
    this.tableCount =  po;
    this.getData()
    this.pos = 0;
  }

  getData(): Observable<any[]> {
    let dataList: any[] = [];

    const copyItems = Object.assign([], this.EmployeeData);
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
    return this.EmployeeData.length;
  }

}
