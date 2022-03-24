import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    dpcTitle:"", 
    dpcDsc:"",
    createDate: "",
    refId:1
  }
  constructor(
    private api: ApiService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  addContact():void{

    const newData = new Date();
    this.addModal.createDate =  newData.getFullYear().toString()+'-'+ (newData.getMonth() + 1).toString()+'-'+newData.getDate().toString();
    this.subs.sink = this.api.addContact(this.addModal, 'addDepartmentContact').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Contact/List']);
      
    })
  }

}
