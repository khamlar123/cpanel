import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SiteLinkService } from '../api/site-link.service';

@Component({
  selector: 'app-sitelink-update',
  templateUrl: './sitelink-update.component.html',
  styleUrls: ['./sitelink-update.component.css']
})
export class SitelinkUpdateComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    slid: 0,
    slName: '', 
    slLink:''
  }
  constructor(private api: SiteLinkService,  private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void {
    this.addModal.slid = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id): void{
    this.subs.sink = this.api.getDetailSiteLink(id, 'listOneSitelinks').subscribe(res => {
      console.log(res);
      
    })
  }

  updateLink(): void{
   this.subs.sink = this.api.updateSiteLink(this.addModal, 'updateSitelinks').subscribe(res => {
      alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Site/List']);
    })
  }

}
