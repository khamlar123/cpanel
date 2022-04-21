import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { SiteLinkService } from '../api/site-link.service';

@Component({
  selector: 'app-sitelink-update',
  templateUrl: './sitelink-update.component.html',
  styleUrls: ['./sitelink-update.component.css']
})
export class SitelinkUpdateComponent implements OnInit {
  private subs = new SubSink();
  addModal = {
    slid: 0,
    slName: '',
    slLink: '',
    imgUrl: [''],
  };

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;

  constructor(private api: SiteLinkService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.addModal.slid = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id): void {
    this.subs.sink = this.api.getDetailSiteLink(id, 'listOneSitelinks').subscribe(res => {
      this.addModal.slLink = res.data[0].slLink;
      this.addModal.slName = res.data[0].slName;
    });
  }

  updateLink(): void {
    const map: string[] = [];
    const header = 'data:image/jpeg;base64,';
    map.push(header + this.base64textString);
    this.addModal.imgUrl = (this.base64textString !== undefined) ? map.map((m) => m) : [];
    this.subs.sink = this.api.updateSiteLink(this.addModal, 'updateSitelinks').subscribe(res => {
      alert('Edit Data Successfully.');
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
