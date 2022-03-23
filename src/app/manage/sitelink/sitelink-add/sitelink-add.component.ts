import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SiteLinkService } from '../api/site-link.service';

@Component({
  selector: 'app-sitelink-add',
  templateUrl: './sitelink-add.component.html',
  styleUrls: ['./sitelink-add.component.css']
})
export class SitelinkAddComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    slName: '', 
    slLink: '', 
    createDate: '',
  }
  siteLinkId = 0;
  constructor(private api: SiteLinkService, private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void { 
   
  }

  addSiteLink(): void{
  
    const newData = new Date();
    this.addModal.createDate =  newData.getFullYear().toString()+'-'+ (newData.getMonth() + 1).toString()+'-'+newData.getDate().toString();
   this.subs.sink = this.api.addSiteLink(this.addModal, 'addSitelinks').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Site/List']);
    })
  }

}
