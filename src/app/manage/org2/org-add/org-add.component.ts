import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.css']
})
export class OrgAddComponent implements OnInit {
  modal = {
    name: '',
    type: '',
    parent: 0,
    createDate: '',
    org_id: 3,
  };

  Parent: {
    name: string;
    type: string;
    parent: string;
    createDate: string;
    org_id: string;
    stId: string;
  }[] = [];
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {

    this.loadParent();
  }



  loadParent(): void {
    this.api.loadAllStructures('listAllStructures').subscribe(res => {
      if (res.status === '1') {
        this.Parent = res.data.filter(f => f.org_id === "3");
      }
    });
  }

  addFunc(): void {
    const newData = new Date();
    // tslint:disable-next-line:max-line-length
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.addStructures(this.modal, 'addStructures').subscribe(res => {
      if (res.status === '1') {
        alert('Add Data Successfully.');
        this.route.navigate(['/main/Manage/Org2/List']);
      }
    });
  }

}
