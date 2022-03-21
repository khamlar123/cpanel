import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../API/api.service';
import { IAddPod } from '../interface/i-add-pod';
import { VmService } from '../view-model/vm.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  url = `http://216.127.173.163/`;
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

  productId = 0;
  constructor(
    private api: ApiService,
    public vm : VmService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductDetail();


  }

  getProductDetail():void{
    this.api.getProductDetail(this.productId.toString(), 'listOneProduct').subscribe(res => {
      let data = res.data[0];

      
      this.addProductModal.prodName = data.prodName;
      this.addProductModal.imgUrl = data.imgUrl;
      this.addProductModal.public = +data.public;
      this.addProductModal.dsc = data.dsc;
      this.addProductModal.price = data.price;
      this.addProductModal.salsePrice = data.salsePrice;
      this.addProductModal.score = data.score;
      this.addProductModal.ranking =data.ranking;
      this.addProductModal.qty = data.qty;
      this.addProductModal.web_id = data.web_id;
      this.addProductModal.prodCover_id = data.prodCover_id;
      this.addProductModal.productdsc = ''
      this.addProductModal.prod_id = data.productId      
    })
  }

  updateProduct():void{
        var map:string[] = [];
        const header = 'data:image/jpeg;base64,';
        map.push(header+ this.base64textString);
        

        this.vm.productDetail.prodName = this.addProductModal.prodName;
        this.vm.productDetail.imgUrl = (this.imgURL)? map: [];
        this.vm.productDetail.public = "1";
        this.vm.productDetail.dsc = this.addProductModal.dsc;
        this.vm.productDetail.price = this.addProductModal.price;
        this.vm.productDetail.salsePrice = this.addProductModal.salsePrice;
        this.vm.productDetail.score = 5;
        this.vm.productDetail.ranking =this.addProductModal.ranking;
        this.vm.productDetail.qty = this.addProductModal.qty;
        this.vm.productDetail.web_id = this.addProductModal.web_id;
        this.vm.productDetail.prodCover_id = this.addProductModal.prodCover_id;
        this.vm.productDetail.prod_id = this.productId;
        this.vm.productDetail.productdsc = this.addProductModal.productdsc;
 
    
        const method = 'updateProduct'
        this.api.updateProduct(this.vm.productDetail, method).subscribe(res => {
          if(res.status == '1'){
    
            this.vm.productId = -1; 
            alert('Edit Data Successfully.');
            this.router.navigate(['/main/Manage/Product/List']);
            this.resetModal();
          }
          
        },err => console.log(err),
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
