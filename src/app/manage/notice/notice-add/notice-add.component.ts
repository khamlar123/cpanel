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
export class NoticeAddComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;

    addModel = {
      title:'',
      dsc: '',
      imgUrl: [],
      web_id: 1,
      price: 0,
      createDate: '',
    };

  constructor(
    public vm: NoticeViewModueService,
    private router: Router,
    public api: NoticeService,
  ) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
  }

  getImgUrl(url: string): string {
    return (JSON.parse(url)[0]) ? JSON.parse(url)[0] : JSON.parse(url);
  }

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

  addNewNotice(): void {
    const method = 'addNotice';
    const map: string[] = [];

    const header = 'data:image/jpeg;base64,';
    map.push(header + this.base64textString);

    this.addModel.imgUrl = map.map(m => m);

    const newData = new Date();
    this.addModel.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.subs.sink = this.api.addNotice(this.addModel, method).subscribe(res => {
      if (res.status === '1') {

        alert('Add Data Successfully.');
        this.router.navigate(['/main/Manage/Notice/List']);
        this.vm.resetNotice();
      }
    }, () => console.log(),
      () => { }
    );
  }

}
