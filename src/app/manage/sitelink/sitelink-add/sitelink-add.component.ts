import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SiteLinkService } from '../api/site-link.service';

@Component({
  selector: 'app-sitelink-add',
  templateUrl: './sitelink-add.component.html',
  styleUrls: ['./sitelink-add.component.css']
})
export class SitelinkAddComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    slName: '',
    slLink: '',
    createDate: '',
    imgUrl: [''],
  };


  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;

  siteLinkId = 0;
  constructor(private api: SiteLinkService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void { }

  addSiteLink(): void {

    const map: string[] = [];
    const header = 'data:image/jpeg;base64,';
    map.push(header + this.base64textString);
    this.addModal.imgUrl = map.map(m => m);
    const newData = new Date();
    // tslint:disable-next-line:max-line-length
    this.addModal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.subs.sink = this.api.addSiteLink(this.addModal, 'addSitelinks').subscribe(res => {
      alert('Add Data Successfully.');
      this.route.navigate(['/main/Manage/Site/List']);
    });
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

}
