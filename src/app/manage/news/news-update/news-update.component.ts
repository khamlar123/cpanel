import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { ApiService } from '../api/api.service';
import { NewsService } from '../vm/news.service';

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent implements OnInit {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  newsId = 0;
  base64textString: any;
  constructor(public vm: NewsService, public api: ApiService, private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getDetail(this.route.snapshot.paramMap.get('id'), 'listOneNews').subscribe(res => {
      console.log(res);
      this.vm.newsDetail.title = res.data[0].title;
      this.vm.newsDetail.dsc = res.data[0].dsc;
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

  updateNews():void{
   alert`adsasd`
    const method = 'updateNews';
    var map:string[] = [];
    const header = 'data:image/jpeg;base64,';
    map.push(header+ this.base64textString);
     this.vm.newsDetail.news_id =this.newsId;
    this.vm.newsDetail.imgUrl =(this.base64textString !== undefined)? map.map(m => m): [];
    console.log(this.vm.newsDetail);
    
      this.subs.sink = this.api.updateNews(this.vm.newsDetail,method).subscribe(res => {
        console.log(res);
        
        if(res.status === '1'){
          alert('Edit Data Successfully.');
          this.router.navigate(['/main/Manage/News/List']);
          this.vm.newsId = -1;
    
      }
      },err => console.log(err),
      () => {
   
      }
      )
  }


}
