import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-product-tea-update',
  templateUrl: './product-tea-update.component.html',
  styleUrls: ['./product-tea-update.component.css']
})
export class ProductTeaUpdateComponent implements OnInit {

  modal = {
    createDate: '',
    teaDsc: '',
    teaId: 0,
    teaTitle: '',
    teacLogo: [''],
    videoLink: '',
  }

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;
  constructor(private api: ApiService, private route: Router, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.modal.teaId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }

  loadDetail(id: string): void {
    this.api.deleteProductTea(id, 'listOneProductTea').subscribe(res => {
      if (res.status === "1") {
        this.modal = res.data[0];
        this.modal.teaId = Number(res.data[0].teaId);
      }
    })
  }

  updateFunc(): void {
    var map: string[] = [];

    const header = 'data:image/jpeg;base64,';
    map.push(header + this.base64textString)
    this.modal.teacLogo = (this.base64textString !== undefined) ? map : [];

    this.api.updateProductTea(this.modal, 'updateProductTea').subscribe(res => {
      if (res.status === "1") {
        alert('Edit Data Successfully.');
        this.route.navigate(['/main/Manage/ProductTea/List']);
      }

    })

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
