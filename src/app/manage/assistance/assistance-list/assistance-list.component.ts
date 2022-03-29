import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/service/main.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.css']
})
export class AssistanceListComponent implements OnInit {
  
  pos = 0;
  tableCount = 10;
  searchValue = '';
  assistanceList: {
    asId: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    refId: string;
    title: string;
  }[] = [];

  masterAssistanceList: {
    asId: string;
    createDate: string;
    dsc: string;
    fileEn: string;
    fileLa: string;
    refId: string;
    title: string;
  }[] = [];
  url
  constructor(private api: ApiService, public main: MainService) { 
    this.url = this.main.getEnpoin();

    
  }

  ngOnInit(): void {
    this.loadAssistan();

  }


  loadAssistan():void{
    this.api.loadAllAssistanceUrl('listAllAssistance').subscribe(res => {
      console.log(res);
      this.assistanceList = res.data;
      this.masterAssistanceList = res.data;
    })
  }

  tableCountFunc(): any{
    const fillterItems = (this.assistanceList)? this.assistanceList.slice(0, this.tableCount) : null;
    return fillterItems.filter(f => f.refId === "1");
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.assistanceList =  this.masterAssistanceList.filter(f => 
          f.title.includes(this.searchValue.toLowerCase()) || 
          f.dsc.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.assistanceList  =  this.masterAssistanceList;
    }
  }

  deleteFunc(id: string):void{
    this.api.deleteAssistanceUrl(id, 'deleteAssistance').subscribe(res => {
      if(res.status === '1'){
        this.assistanceList = this.assistanceList.filter(f => f.asId !== id);
      }
    })
   }

   getImgUrl(url: string):string{
    let str = JSON.parse(url)[0];
    return this.url + str.slice(7, str.length);
  }


}
