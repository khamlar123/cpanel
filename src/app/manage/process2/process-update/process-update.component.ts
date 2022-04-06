import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-process-update',
  templateUrl: './process-update.component.html',
  styleUrls: ['./process-update.component.css']
})
export class ProcessUpdateComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    prId:0,
    prDsc:'', 
    prTitle:'', 
    refId:2,
    createDate: ''
  }


  constructor(private api :ApiService,private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void {
    this.addModal.prId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadProcessDetail(this.routes.snapshot.paramMap.get('id'))
  }


  loadProcessDetail(id: string):void{
    this.subs.sink = this.api.getDetail(id, 'listOneProcess').subscribe(res => {

      this.addModal.prDsc = res.data[0].prDsc;
      this.addModal.prTitle = res.data[0].prTitle;
      this.addModal.refId = res.data[0].refId;
      this.addModal.createDate = res.data[0].createDate;
    })
  }

  update():void{
    this.subs.sink = this.api.updateProcess(this.addModal, 'updateProcess').subscribe(res => {
    alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Process2/List']);
    })
  }

}
