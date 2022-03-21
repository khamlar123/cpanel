import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { NoticeService } from '../api/notice.service';
import { NoticeViewModueService } from '../vm/notice-view-modue.service';

@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.css']
})
export class NoticeAddComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString:any;

  constructor(
    public vm : NoticeViewModueService,
    private router : Router,
    public api : NoticeService,
  ) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  getImgUrl(url: string):string{
    return (JSON.parse(url)[0])?JSON.parse(url)[0]: JSON.parse(url);
  }

  handleFileInput(el: any) {
    this.fileToUpload = el.files.item(0);
    this.preview(this.fileToUpload);
    this.handleFileSelect(el);
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

  handleFileSelect(evt){
    var files = evt.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);    
  }

  addNewNotice():void{
   
    const method = 'addNotice';
    var map:string[] = [];

    const header = 'data:image/jpeg;base64,';
    map.push(header+ this.base64textString)

    const model = {
      title: this.vm.noticeDetail.title, 
      dsc: this.vm.noticeDetail.dsc,
      imgUrl: map.map(m => m),
      web_id: 1,
    }

      this.subs.sink = this.api.addNotice(model,method).subscribe(res => {
          if(res.status === '1'){
             console.log(res);
             alert('Add Data Successfully.');
             this.router.navigate(['/main/Manage/Notice/List']);
          }
      },err => console.log(),
      () => {
    
      }
      )
  }

}
