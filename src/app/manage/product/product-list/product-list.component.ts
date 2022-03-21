import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SubSink } from 'subsink';
import { ApiService } from '../API/api.service';
import { VmService } from '../view-model/vm.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  private subs = new SubSink();
  url = `http://216.127.173.163/`;
  searchValue = '';
  pos = 0;
  pageNumber = 1;
  tableCount  = 10;

  constructor(
    private api: ApiService,
    public vm : VmService,
    private router: Router
  ) { }


  ngOnDestroy(): void {
   this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.getProduct();
    const token = localStorage.getItem("token");
    if(token === null){
      alert('plese login');
      this.router.navigate(['/auth/login']);
    }

    this.tableCountFunc();
  }


  getProduct(): void {
    const method = "listAllProduct";
    this.subs.sink = this.api.getProduct(method).subscribe((res) => {
      if (res.status === "1") {
        this.vm.setProductImg(res.data);
      }

    });
  }

  addImgModel(pod): void {
    this.vm.productId = pod.productId;
    this.vm.uploadImgModel = true;
  }

  getImgUrl(url: string): string {
    if (url) {
      return JSON.parse(url)[0] ? JSON.parse(url)[0] : JSON.parse(url);
    } else {
      return url;
    }
  }

  deleteProduct(id: string): void {
  
    const method = "deleteProduct";
    if (confirm("Are you sure to delete product Id" + " " + id)) {
      this.subs.sink =   this.api.deletePRoduct(id, method).subscribe((res) => {
        if(res.status == '1'){
          this.vm.proList = this.vm.proList.filter(f => f.prod_id !== id);
     
        }
      },err => console.log(err),
      () => {
 
      });
    }
  }

  detailFunc(id: string): void {
     
    const method = 'listOneProduct';
    this.subs.sink =   this.api.getProductDetail(id, method).subscribe(res => {

      if(res.status == '1'){
        const map =res.data[0];
        this.vm.productDetail.prod_id = +map.prod_id;
        this.vm.productDetail.prodName=map.prodName;
        this.vm.productDetail.imgUrl= map.imgUrl;
        this.vm.productDetail.public = map.public;
        this.vm.productDetail.dsc=map.dsc;
        this.vm.productDetail.price= +map.price;
        this.vm.productDetail.salsePrice=+map.salsePrice;
        this.vm.productDetail.score=+map.score;
        this.vm.productDetail.ranking=+map.ranking;
        this.vm.productDetail.qty=+map.qty;
        this.vm.productDetail.web_id=+map.web_id;
        this.vm.productDetail.prodCover_id=+map.prodCover_id;
        this.vm.productId = +id;
        this.vm.productDetail.isActive = 1;
      }
  
    },err => console.log(err),
    () => {
    }
    )
  }

  productList(): any {
    let product: any[] = [];

    const copyItems = Object.assign([], this.vm.proList);
    if (copyItems.length > 9) {
      product = copyItems.splice(this.pos * 10, 10);
    } else {
      product = copyItems;
    }
    return of(product);
  }

  searchFunc():void{
    if(this.searchValue !== ''){
        this.vm.proList =  this.vm.masterPtoduct.filter(f => 
          f.prod_id.includes(this.searchValue) || 
          f.prodName.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.vm.proList =  this.vm.masterPtoduct;
    }
  }

  tableCountFunc(): any{
    
    
    return (this.vm.proList)? this.vm.proList.slice(0, this.tableCount) : null;
   }


}
