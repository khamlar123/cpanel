import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  editModal = {
    emId: 0,
    emName: '', 
    emLastName: '', 
    emPhone: '', 
    emPosition: '', 
    emAddress: '', 
    createDate: '',
    emJoinDate: '',
  }
  constructor(private api: ApiService,  private route: Router,    private routes : ActivatedRoute,) { }

  ngOnInit(): void {
    this.editModal.emId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail();
  }

  loadDetail():void{
    this.api.getDetail(this.routes.snapshot.paramMap.get('id'), 'listOneEmployee').subscribe(res => {
      this.editModal = res.data[0];
    })
  }

  updateFunc():void{
     this.api.updateEmployee(this.editModal, 'updateEmployee').subscribe(res => {
      alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Employee/List']);
    })
  }

}
