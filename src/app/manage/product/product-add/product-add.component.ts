import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../API/api.service';
import { IAddPod } from '../interface/i-add-pod';
import { VmService } from '../view-model/vm.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductModal: IAddPod ={
    prodName: '',
    imgUrl: [],
    public:  0,
    dsc:  '',
    price: 0,
    salsePrice: 0,
    score: 0,
    ranking:0,
    qty: 0,
    web_id: 0,
    prodCover_id: 0,
    productdsc: '',
    prod_id : 0,
  };

  fileToUpload: File = null;
  imagePath;
  imgURL: any;
  message: string;
  base64textString:any;

  constructor(
    private api: ApiService,
    public vm : VmService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addProduct():void{
    var map:string[] = [];
    const header = 'data:image/jpeg;base64,';
    map.push(header+ this.base64textString);
    this.addProductModal.imgUrl = map;
    this.addProductModal.score  = 5;
    this.addProductModal.web_id = 1;
    const method = 'addProduct';
    this.api.addProduct(this.addProductModal, method).subscribe(res => {
          if(res.status == '1'){
            alert('Add Data Successfully.');
            this.router.navigate(['/main/Manage/Product/List']);
            this.resetModal();
          }
    },error => console.log(error),
    () => {
    }
    )
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


  resetModal():void{
    const reset = {
      prodName: '',
      imgUrl: [],
      public:  0,
      dsc:  '',
      price: 0,
      salsePrice: 0,
      score: 0,
      ranking:0,
      qty: 0,
      web_id: 0,
      prodCover_id: 0,
      productdsc: '',
      prod_id : 0,
    }
    this.addProductModal = reset;
  }

}


