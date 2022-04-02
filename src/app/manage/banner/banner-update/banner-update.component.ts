import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { BannerApiService } from '../api/banner-api.service';
import { VmService } from '../vm/vm.service';

@Component({
  selector: 'app-banner-update',
  templateUrl: './banner-update.component.html',
  styleUrls: ['./banner-update.component.css']
})
export class BannerUpdateComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  bannerId = 0;
  base64textString:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api : BannerApiService,
    public vm : VmService,
  ) { }

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.bannerId = Number(this.route.snapshot.paramMap.get('id'));
  this.detailFunc(this.bannerId.toString())
  }

  detailFunc(id: string):void{
    this.subs.sink =  this.api.getbannerDetail(id, 'listOneBanner').subscribe(res => {
        if(res.status > 0){
         this.vm.bannerDetail = res.data[0];
          this.vm.bannerId = +id;
        }
      })
    
    }

  updateBanner():void{
    var map:string[] = [];

    const header = 'data:image/jpeg;base64,';
    map.push(header+ this.base64textString)
    
    
    this.vm.bannerDetail.imgUrl =(this.base64textString !== undefined)? map:[] ;
    this.vm.bannerDetail.ref_id = "1";
    this.subs.sink = this.api.updateBanner(this.vm.bannerDetail, 'updateBanner').subscribe(res => {
      if(res.status == "1"){
   
        this.vm.bannerId = -1;
        const updateData = this.vm.bannerList.find(f => f.bann_id === this.vm.bannerDetail.bann_id);
      
        updateData.orderIndex = this.vm.bannerDetail.orderIndex;
        alert("Edit Data Successfully.");
        this.router.navigate(["/main/Manage/Banner/List"]);
      
      }else{
   
        alert('Update error');
      }
    },err => console.log(err),
    () => {
 
    }
    )
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
      this.message = 'Only images are supported.';
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
 
    
  }

  handleFileSelect(evt){
    var files = evt.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.base64textString= btoa(binaryString);     
 }

}
