import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  updaloForm: FormGroup;

  constructor(
    private vdio: VdioApiService,
    private router: Router,
    private fb: FormBuilder,
  ) { }
  ngOnDestroy(): void {
   this.subs.unsubscribe();
  }



  ngOnInit(): void {
  }


  addVdio():void{

    if(this.addModal.video_url !== ' '){

      this.subs.sink = this.vdio.addNewVdio('insertVideo',this.addModal).subscribe(res => {
        if(res.status  === "1"){
          alert('Add Data Successfully.');
          this.router.navigate(['/main/Manage/Vdio/List']);
        }
      },err => console.log(err),
      ()=> {}
      );
    }else{
      this.subs.sink = this.vdio.addNewVdioFile('addVideo', this.addModal, this.fileToUpload).subscribe(res => {
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

  setAddFile():void{
    this.uploadFile = true;
    this.addModal.video_url = ' ';
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
