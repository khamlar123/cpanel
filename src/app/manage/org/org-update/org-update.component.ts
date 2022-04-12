import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-org-update',
  templateUrl: './org-update.component.html',
  styleUrls: ['./org-update.component.css']
})
export class OrgUpdateComponent implements OnInit {
  modal = {
    name: '',
    type: '',
    parent: 0,
    createDate: '',
    org_id: 1,
    stId: 0,
    imgUrl: [''],
    dsc: '',
  };

  Parent: {
    name: string;
    type: string;
    parent: string;
    createDate: string;
    org_id: string;
    stId: number;
    imgUrl: string[],
    dsc: string,
  }[] = [];

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.modal.stId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
    this.loadParent();
  }

  loadDetail(id: string): void {
    this.api.getDetailStructures(id, 'listOneStructures').subscribe(res => {
      this.modal = res.data[0];
      this.modal.parent = Number(res.data[0].parent);
      this.modal.org_id = Number(res.data[0].org_id);
      this.modal.stId = Number(res.data[0].stId);
    });
  }

  loadParent(): void {
    this.api.loadAllStructures('listAllStructures').subscribe(res => {
      if (res.status === '1') {
        this.Parent = res.data;
        res.data.forEach((x, i) => {
          this.Parent[i].stId = Number(x.stId);
        });
      }
    });
  }

  updateFunc(): void {
    var map: string[] = [];
    const header = "data:image/jpeg;base64,";
    map.push(header + this.base64textString);
    this.modal.imgUrl =  (this.base64textString !== undefined)? map.map((m) => m):[];
    this.api.updateStructures(this.modal, 'updateStructures').subscribe(res => {
      if (res.status === '1') {
        alert('Edit Data Successfully.');
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
