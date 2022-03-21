import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubSink } from "subsink";
import { ApiService } from "../api/api.service";
import { NewsService } from "../vm/news.service";

@Component({
  selector: "app-news-add",
  templateUrl: "./news-add.component.html",
  styleUrls: ["./news-add.component.css"],
})
export class NewsAddComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;

  base64textString: any;
  constructor(public vm: NewsService, public api: ApiService, private router: Router) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {}

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


  addNews():void{

    var map:string[] = [];
    const header = 'data:image/jpeg;base64,';
    map.push(header+ this.base64textString);

    this.vm.newsDetail.imgUrl =map.map(m => m);
    this.vm.newsDetail.cover_id = 1;

    console.log(this.vm.newsDetail);
    

    const method = 'addNews';
      this.subs.sink = this.api.addNews(this.vm.newsDetail,method).subscribe(res => {
        if(res.status === '1'){
            this.vm.newsId = -1;
            alert('Add Data Successfully.');
            this.router.navigate(['/main/Manage/Product/List']);
        }
      },err => console.log(err),
      () => {
      }
      )
  }

}
