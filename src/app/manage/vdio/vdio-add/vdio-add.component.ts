import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { VdioApiService } from '../api/vdio-api.service';

@Component({
  selector: 'app-vdio-add',
  templateUrl: './vdio-add.component.html',
  styleUrls: ['./vdio-add.component.css']
})
export class VdioAddComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  addModal: {
    "video_name": string;
    "video_description": string;
    "status": string;
    "orderIndex": number;
    "video_url":string;
  } = {
    "video_name": '',
    "video_description": '',
    "status": '0',
    "orderIndex":0,
    "video_url":'',
  };
  constructor(
    private vdio: VdioApiService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
   this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }


  addVdio():void{
   this.subs.sink = this.vdio.addNewVdio('insertVideo',this.addModal).subscribe(res => {
      if(res.status  === "1"){
        alert('Add Data Successfully.');
        this.router.navigate(['/main/Manage/Vdio/List']);
      }
    },err => console.log(err),
    ()=> {
    
    }
    );
  }

}
