import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-depament-update',
  templateUrl: './depament-update.component.html',
  styleUrls: ['./depament-update.component.css']
})
export class DepamentUpdateComponent implements OnInit {
  depId = 0;
  private subs = new SubSink();
  editModal = {
    dpId: 0,
    dpTitel: '',
    dpDsc: '',
  }


  constructor(private api :ApiService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.depId = Number(this.router.snapshot.paramMap.get('id'));
    this.loadDepamentInfo(this.router.snapshot.paramMap.get('id'))
  }

  loadDepamentInfo(id: string):void{
    this.subs.sink = this.api.getDetailDepamentInfo(id, 'listOneDepartmentInfo').subscribe(res => {
      this.editModal.dpId = this.depId;
      this.editModal.dpDsc = res.data[0].dpDsc;
      this.editModal.dpTitel = res.data[0].dpTitel;
    })
  }

  edit():void{
    this.subs.sink = this.api.updateDepamentInfo(this.editModal, 'updateDepartmentInfo').subscribe(res => {
      alert('Edit Data Successfully.');
      this.route.navigate(['/main/Manage/Depament/List']);
    })
  }

}
