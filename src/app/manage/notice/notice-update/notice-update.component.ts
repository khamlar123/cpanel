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
  url = ``;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;
  noticeId = 0;
  constructor(
    public vm: NoticeViewModueService,
    private router: Router,
    public api: NoticeService,
    private route: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.noticeId = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getDetailNotice(this.route.snapshot.paramMap.get('id'), 'listOneNotice').subscribe(res => {
      const mapData = res.data[0];
      this.vm.noticeDetail.notice_id = Number(mapData.notice_id);
      this.vm.noticeDetail.title = mapData.title;
      this.vm.noticeDetail.dsc = mapData.dsc;
      this.vm.noticeDetail.gen_id = mapData.gen_id;
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  // getImgUrl(url: string): string {
  //   return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
  // }

  handleFileInput(el: any) {
    this.fileToUpload = el.files.item(0);
    this.preview(this.fileToUpload);
    this.handleFileSelect(el);
  }

  preview(files) {
    if (files.length === 0) { return; }

    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  handleFileSelect(evt) {
    const files = evt.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  updateNotice(): void {
    const method = 'updateNotice';
    const map: string[] = [];

    const header = 'data:image/jpeg;base64,';
    map.push(header + this.base64textString);
    const model = {
      gen_id: this.vm.noticeDetail.gen_id,
      title: this.vm.noticeDetail.title,
      dsc: 'aabbccdd',
      imgUrlString: map[0],
      web_id: 1,
      price: this.vm.noticeDetail.price,
      createDate: '',
    };

    const newData = new Date();
    model.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();

    this.subs.sink = this.api.updateNotice(model, method).subscribe(res => {
      if (res.status === '1') {
        alert('Edit Data Successfully.');
        this.router.navigate(['/main/Manage/Notice/List']);
      }
    }, () => console.log(),
      () => { }
    );
  }

  getImgUrl1(url: string): string {
    if (url) {
      return JSON.parse(url)[0] ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return '';
    }
  }

  getImgUrl(): string {
    return this.url.split('/backend')[0];
  }

}
