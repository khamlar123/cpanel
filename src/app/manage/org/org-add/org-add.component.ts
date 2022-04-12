import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.css']
})
export class OrgAddComponent implements OnInit {
  modal = {
    name: '',
    type: '',
    parent: 0,
    createDate: '',
    org_id: 1,
    imgUrl: [''],
    dsc: '',
  };

  Parent: {
    name: string;
    type: string;
    parent: string;
    createDate: string;
    org_id: string;
    stId: string;
    imgUrl: [''];
    dsc: '';
  }[] = [];

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {

    this.loadParent();
  }



  loadParent(): void {
    this.api.loadAllStructures('listAllStructures').subscribe(res => {
      if (res.status === '1') {
        this.Parent = res.data.filter(f => f.org_id === "1");;
      }
    });
  }

  addFunc(): void {
    var map: string[] = [];
    const header = "data:image/jpeg;base64,";
    map.push(header + this.base64textString);
    this.modal.imgUrl = map.map((m) => m);
    const newData = new Date();
   
    // tslint:disable-next-line:max-line-length
    this.modal.createDate = newData.getFullYear().toString() + '-' + (newData.getMonth() + 1).toString() + '-' + newData.getDate().toString();
    this.api.addStructures(this.modal, 'addStructures').subscribe(res => {
      if (res.status === '1') {
        alert('Add Data Successfully.');
        this.route.navigate(['/main/Manage/Org/List']);
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
