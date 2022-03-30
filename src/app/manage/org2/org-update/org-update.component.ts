import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-org-update',
  templateUrl: './org-update.component.html',
  styleUrls: ['./org-update.component.css']
})
export class OrgUpdateComponent implements OnInit {
  modal = {
    name: '',
    type: '',
    parent: 0,
    createDate: '',
    org_id: 1,
    stId: 0
  };

  Parent: {
    name: string;
    type: string;
    parent: string;
    createDate: string;
    org_id: string;
    stId: number;
  }[] = [];
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.modal.stId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
    this.loadParent();
  }

  loadDetail(id: string): void {
    this.api.getDetailStructures(id, 'listOneStructures').subscribe(res => {
      this.modal = res.data[0];
      this.modal.parent = Number(res.data[0].parent);
      this.modal.org_id = Number(res.data[0].org_id);
      this.modal.stId = Number(res.data[0].stId);
    });
  }

  loadParent(): void {
    this.api.loadAllStructures('listAllStructures').subscribe(res => {
      if (res.status === '1') {
        this.Parent = res.data;
        res.data.forEach((x, i) => {
          this.Parent[i].stId = Number(x.stId);
        });
      }
    });
  }

  updateFunc(): void {
    this.api.updateStructures(this.modal, 'updateStructures').subscribe(res => {
      if (res.status === '1') {
        alert('Edit Data Successfully.');
        this.route.navigate(['/main/Manage/Org2/List']);
      }
    });
  }

}
