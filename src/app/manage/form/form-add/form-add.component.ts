import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {
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
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addProposFunc(): void {
    const newData = new Date();
    // tslint:disable-next-line:max-line-length
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.addPropose(this.modal, 'addPropose').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Form/List']);

    });
  }

}
