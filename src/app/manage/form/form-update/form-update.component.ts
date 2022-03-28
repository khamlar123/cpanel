import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {
  modal = {
    prpId: '',
    stTitle: '',
    contactDsc: '',
    proposName: '',
    proposeLastName: '',
    phone: '',
    age: 0,
    createDate: '',
  };

  formId = 0;
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.formId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail();
  }


  loadDetail(): void {
    this.api.getDetailPropose(this.formId, 'listOnePropose').subscribe(res => {
      this.modal = res.data[0];
    });
  }

  updateFunc(): void {
    this.api.updatePropose(this.modal, 'updatePropose').subscribe(res => {
      alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Form/List']);
    });
  }


}
