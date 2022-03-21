import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { NoticeService } from '../api/notice.service';
import { NoticeViewModueService } from '../vm/notice-view-modue.service';

@Component({
  selector: 'app-notice-update',
  templateUrl: './notice-update.component.html',
  styleUrls: ['./notice-update.component.css']
})
export class NoticeUpdateComponent implements OnInit {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString:any;
  noticeId = 0;
  constructor(
    public vm : NoticeViewModueService,
    private router : Router,
    public api : NoticeService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.noticeId = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getDetailNotice(this.route.snapshot.paramMap.get('id'), 'listOneNotice').subscribe(res => {
      const mapData = res.data[0];
       this.vm.noticeDetail.notice_id = Number(mapData.notice_id);
       this.vm.noticeDetail.title = mapData.title;
       this.vm.noticeDetail.dsc = mapData.dsc;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  updateNotice():void{
  
      const method = 'updateNotice';
      var map:string[] = [];

      const header = 'data:image/jpeg;base64,';
      map.push(header+ this.base64textString)

      const model = {
        
        notice_id: this.vm.noticeDetail.notice_id,
        title: this.vm.noticeDetail.title, 
        dsc: this.vm.noticeDetail.dsc,
        imgUrl:(this.base64textString !== undefined)? map.map(m => m): [],
        web_id: 1,
      }



        this.subs.sink = this.api.updateNotice(model,method).subscribe(res => {
            if(res.status === '1'){
              alert('Edit Data Successfully.');
              this.router.navigate(['/main/Manage/Notice/List']);
  
            }
        },err => console.log(),
        () => {
         
        }
        )
  }

}
