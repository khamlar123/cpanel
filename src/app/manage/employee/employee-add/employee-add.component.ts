import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  addModal = {
    emName: '', 
    emLastName: '', 
    emPhone: '', 
    emPosition: '', 
    emAddress: '', 
    createDate: '',
    emJoinDate: '',
    businessType : '',
  }
  constructor(private api: ApiService, private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void {
  }

  addFunc():void{
    const newData = new Date();
    this.addModal.createDate =  newData.getFullYear().toString()+'-'+ (newData.getMonth() + 1).toString()+'-'+newData.getDate().toString();
     this.api.addEmployee(this.addModal, 'addEmployee').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Employee/List']);
    })
  }

}
