import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-council-update',
  templateUrl: './council-update.component.html',
  styleUrls: ['./council-update.component.css']
})
export class CouncilUpdateComponent implements OnInit {
  modal = {
    cou_id: 0,
    title: '', 
    doc: '', 
    createDate: '',
  }
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.modal.cou_id = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id: string): void {

    this.api.getDetailCouncil(id, 'listOneCouncil').subscribe(res => {
      if (res.status === "1") {
        this.modal = res.data[0];
        this.modal.cou_id = Number(res.data[0].cou_id);
 
      }
    })
  }

  updateFunc():void{
    const newData = new Date();
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.updateCouncil(this.modal, 'updateCouncil').subscribe(res => {
      if (res.status === "1") {
        alert('Edit Data Successfully.');
        this.route.navigate(['/main/Manage/council/List']);
      }
    });
  }

}
