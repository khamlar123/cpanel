import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-statistics-update',
  templateUrl: './statistics-update.component.html',
  styleUrls: ['./statistics-update.component.css']
})
export class StatisticsUpdateComponent implements OnInit {

  modal = {
    createDate: '',
    refId: 5,
    spDsc: '',
    stEngLink: [''],
    stId: 0,
    stLaoLink: [''],
    stTitle: '',
  }

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;


  fileToUpload2: File = null;
  imagePath2;
  imgURL2: any;
  message2: string;
  base64textString2: any;
  constructor(private api: ApiService,private route: Router, private routes: ActivatedRoute) { }


  ngOnInit(): void {
    this.modal.stId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadDetail(this.routes.snapshot.paramMap.get('id'));
  }


  loadDetail(id: string):void{
    this.api.getDetailStatistics(id, 'listOneStatistics').subscribe(res => {
     this.modal = res.data[0];
     this.modal.refId = Number(res.data[0].refId);
     this.modal.stId = Number(res.data[0].stId);      
    })
  }

  updateFunc():void{

    var map: string[] = [];
    const header = "data:application/pdf;base64,";
    map.push(header + this.base64textString);

    var map2: string[] = [];
    map2.push(header + this.base64textString2);
    this.modal.stLaoLink =  (this.base64textString !== undefined)? map.map((m) => m):[];
    this.modal.stEngLink = (this.base64textString !== undefined)? map2.map((m) => m):[];

    this.api.updateStatistics(this.modal, 'updateStatistics').subscribe(res => {
      console.log(res);

      if(res.status === "1"){
        alert('Edit Data Successfully.');
        this.route.navigate(['/main/Manage/Statistics5/List']);
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


////////////////
  
handleFileInput2(el: any) {
  this.fileToUpload2 = el.files.item(0);
  this.preview2(this.fileToUpload2);
  this.handleFileSelect2(el);
}


preview2(files) {
  if (files.length === 0) return;

  var mimeType = files.type;
  if (mimeType.match(/image\/*/) == null) {
    this.message2 = "Only images are supported.";
    return;
  }
  var reader = new FileReader();
  this.imagePath2 = files;
  reader.readAsDataURL(files);
  reader.onload = (_event) => {
    this.imgURL2 = reader.result;
  };
}

handleFileSelect2(evt) {
  var files = evt.files;
  var file = files[0];

  if (files && file) {
    var reader = new FileReader();

    reader.onload = this._handleReaderLoaded2.bind(this);

    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded2(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.base64textString2 = btoa(binaryString);
}


}
