import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {
  modal = {
    prpId: '',
    stTitle: '',
    contactDsc: '',
    proposName: '',
    proposeLastName: '',
    phone: '',
    age: 0,
    createDate: '',
    imgUrl : [''],
    status : '',
  };

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;

  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
  }

  addProposFunc(): void {
    var map: string[] = [];
    const header = "data:application/pdf;base64,";
    map.push(header + this.base64textString);
    this.modal.imgUrl = map.map((m) => m);

    const newData = new Date();
    // tslint:disable-next-line:max-line-length
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.addPropose(this.modal, 'addPropose').subscribe(res => {
      if(res.status === "1"){
        alert('Add Data Successfully.');
        this.route.navigate(['/main/Manage/Form/List']);
      }

    });
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
