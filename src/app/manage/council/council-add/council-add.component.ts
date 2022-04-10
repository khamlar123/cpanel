import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-council-add',
  templateUrl: './council-add.component.html',
  styleUrls: ['./council-add.component.css']
})
export class CouncilAddComponent implements OnInit {
  modal = {
    title: '', 
    doc: '', 
    createDate: '',
  }
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addCouncil(): void{
    const newData = new Date();
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.addCouncil(this.modal, 'addCouncil').subscribe(res => {
      if (res.status === "1") {
        alert('Add Data Successfully.');
        this.route.navigate(['/main/Manage/council/List']);
      }
    });
  }

}
