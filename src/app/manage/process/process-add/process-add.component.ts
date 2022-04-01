import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-process-add',
  templateUrl: './process-add.component.html',
  styleUrls: ['./process-add.component.css']
})
export class ProcessAddComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    
    prDsc:'', 
    prTitle:'', 
    refId:1,
    createDate: ''
  }
  constructor(private api :ApiService,private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void {
  }

  addFunc():void{
    const newData = new Date();
    this.addModal.createDate =  newData.getFullYear().toString()+'-'+ (newData.getMonth() + 1).toString()+'-'+newData.getDate().toString();
    this.subs.sink = this.api.addProcess(this.addModal, 'addProcess').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Process/List']);
    })
  }

}
