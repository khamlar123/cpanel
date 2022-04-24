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
  uploadFile = false;
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

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;

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
    
    if(this.addModal.video_url !== ""){
      alert(1)
      this.subs.sink = this.vdio.addNewVdio('insertVideo',this.addModal).subscribe(res => {
        if(res.status  === "1"){
          alert('Add Data Successfully.');
          this.router.navigate(['/main/Manage/Vdio/List']);
        }
      },err => console.log(err),
      ()=> {}
      );
    }else{
      alert(2);
      const status = 1;
      const addNewModel = new FormData();
      addNewModel.append('file', this.fileToUpload);
      addNewModel.append('video_description', this.addModal.video_description);
      addNewModel.append('status', status.toString());
      addNewModel.append('orderIndex', this.addModal.orderIndex.toString());
      addNewModel.append('video_url', this.addModal.video_url);
  
      this.subs.sink = this.vdio.addNewVdioFile('addVideo', addNewModel).subscribe(res => {
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

  handleFileInput(el: any) {
    this.fileToUpload = el.files.item(0);
    this.preview(this.fileToUpload);
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
