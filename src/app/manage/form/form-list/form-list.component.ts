import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  pos = 0;
  tableCount = 10;
  searchValue = '';
  formList: {
      prpId: string;
      stTitle: string; 
      contactDsc: string; 
      proposName: string; 
      proposeLastName: string; 
      phone:string; 
      age:string;
      createDate: string;
      imgUrl : string[];
  }[] =[];

  masterFormList: {
    prpId: string;
    stTitle: string; 
    contactDsc: string; 
    proposName: string; 
    proposeLastName: string; 
    phone:string; 
    age:string;
    createDate: string;
    imgUrl : string[];
}[] =[];
  url ='';
  constructor(private api: ApiService, private main: MainService) { 
    this.url = this.main.getEnpoin();
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm():void{
    const modal= {}
    this.api.loadAllPropose('listAllPropose').subscribe(res => {
      this.formList = res.data;
    })
  }

  tableCountFunc(): any{
    return (this.formList)? this.formList.slice(0, this.tableCount) : null;
   }

   deleteFunc(id: string):void{
   this.api.deletePropose(id, 'deletePropose').subscribe(res => {
      if(res.status === '1'){
        this.formList = this.formList.filter(f => f.prpId !== id);
      }
    })
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.formList =  this.masterFormList.filter(f => 
          f.proposName.includes(this.searchValue.toLowerCase()) || 
          f.stTitle.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.formList  =  this.masterFormList;
    }
  }

  getImgUrl(url: string): string {
    const str = JSON.parse(url)[0];

    if (JSON.parse(url)[0] === null) {
      return '';
    }
    return this.url + str.slice(7, str.length);
  }

}
