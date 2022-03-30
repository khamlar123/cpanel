import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-donor-update',
  templateUrl: './donor-update.component.html',
  styleUrls: ['./donor-update.component.css']
})
export class DonorUpdateComponent implements OnInit {
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;

  modal = {
    imgUrl: [''],
    orderIndex: 0,
    dsc: '',
    title: '',
    donor_id: 0,
  }
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.modal.donor_id = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id: string){
    this.api.getDetailDonor(id, 'listOneDonor').subscribe(res => {
      this.modal = res.data[0];   
      this.modal.orderIndex = Number(res.data[0].orderIndex);
      this.modal.donor_id = Number(res.data[0].donor_id);
    })
  }

  updateFunc():void{
    var map: string[] = [];
    const header = "data:image/jpeg;base64,";
    map.push(header + this.base64textString);
   
    this.modal.imgUrl = map.map((m) => m);
    this.modal.imgUrl = (this.base64textString !== undefined) ? map : [];
    this.api.updateDonor(this.modal, 'updateDonor').subscribe(res => {
      if(res.status === "1"){
        alert('Edit Data Successfully.');
        this.route.navigate(['/main/Manage/Donor/List']);
      }
      
    })
  }

  getImgUrl(url: string): string {
    return JSON.parse(url)[0] ? JSON.parse(url)[0] : JSON.parse(url);
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
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  handleFileSelect(evt) {
    var files = evt.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

}
