import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-depament-add',
  templateUrl: './depament-add.component.html',
  styleUrls: ['./depament-add.component.css']
})
export class DepamentAddComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    dpTitel: '', 
    dpDsc:'',
    createDate: ''
  }
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit(): void {
  }

  addDepamentInfo():void{
    const newData = new Date();
    this.addModal.createDate =  newData.getFullYear().toString()+'-'+ (newData.getMonth() + 1).toString()+'-'+newData.getDate().toString();
    this.subs.sink = this.api.addDepamentInfo(this.addModal, 'addDepartmentInfo').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Depament/List']);
    })
  }

}
