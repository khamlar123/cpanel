import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { publish } from "rxjs/operators";
import { SubSink } from "subsink";
import { BannerApiService } from "../api/banner-api.service";
import { VmService } from "../vm/vm.service";

@Component({
  selector: "app-banner-add",
  templateUrl: "./banner-add.component.html",
  styleUrls: ["./banner-add.component.css"],
})
export class BannerAddComponent implements OnInit {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString: any;
  constructor(
    private api: BannerApiService,
    public vm: VmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vm.bannerDetail.ref_id = '1';
    if (this.vm.bannerId == 0) {
      this.vm.resetBannerDetail();
    }
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

  addBanner(): void {
 
    var map: string[] = [];

    const header = "data:image/jpeg;base64,";
    map.push(header + this.base64textString);
   
      const modal = {
        imgUrl: map.map((m) => m),
        orderIndex: this.vm.bannerDetail.orderIndex,
        ref_id: 1,
        web_id: 1,
        isActive: 1,
        dsc: this.vm.bannerDetail.dsc,
      };

      console.log(modal);
      

      this.subs.sink = this.api.addBanner(modal, "addBanner").subscribe(
        (res) => {
          if (res.message == "Add Data Successfully.") {
            alert("Add Data Successfully.");
            this.router.navigate(["/main/Manage/Banner/List"]);

            this.vm.bannerId = -1;
            this.vm.reset();
          } else {
            alert("Add Data error");
          }
        },
        (err) => console.log(err),
        () => {}
      );
    
  }
}
