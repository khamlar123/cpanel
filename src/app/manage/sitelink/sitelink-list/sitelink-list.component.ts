import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { SiteLinkService } from '../api/site-link.service';

@Component({
  selector: 'app-sitelink-list',
  templateUrl: './sitelink-list.component.html',
  styleUrls: ['./sitelink-list.component.css']
})
export class SitelinkListComponent implements OnInit {
  private subs = new SubSink();
  pos = 0;
  tableCount = 10;
  searchValue = '';
  siteLink: {
    createDate: any;
    slLink: string;
    slName: string;
    slid: string;
  }[] = [];

  masterSiteLink: {
    createDate: any;
    slLink: string;
    slName: string;
    slid: string;
  }[] = [];
  constructor(private api: SiteLinkService) { }




  ngOnInit(): void {
    this.loadSiteLink();
  }

  loadSiteLink(): void{
    this.subs.sink = this.api.loadAllSiteLink('listAllSitelinks').subscribe(res => {
      this.siteLink = res.data;
      this.masterSiteLink = res.data;
    });
  }

  tableCountFunc(): any{
    return (this.siteLink)? this.siteLink.slice(0, this.tableCount) : null;
   }

   deleteFunc(id: string):void{
    this.subs.sink = this.api.deleteSiteLink(id, 'deleteSitelinks').subscribe(res => {
      if(res.status === '1'){
        this.siteLink = this.siteLink.filter(f => f.slid !== id);
      }
    })
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.siteLink =  this.masterSiteLink.filter(f => 
          f.slName.includes(this.searchValue.toLowerCase()) || 
          f.createDate.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.siteLink  =  this.masterSiteLink;
    }
  }



}
