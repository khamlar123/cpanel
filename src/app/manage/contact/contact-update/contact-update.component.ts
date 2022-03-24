import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    createDate: '',
    dpcDsc: '',
    dpcId: '',
    dpcTitle: '',
    refId: "1",
  }

  id = 0
  constructor(private api: ApiService,  private route: Router,    private routes : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id: any):void{
    this.subs.sink = this.api.getDetail(id ,'listOneDepartmentContact').subscribe(res => {
      this.addModal = res.data[0];
  
    })
  }

  update():void{
    this.subs.sink = this.api.updateContact(this.addModal, 'updateDepartmentContact').subscribe(res => {
    alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Contact/List']);
    })
  }



}
