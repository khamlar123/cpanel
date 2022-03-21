import { Injectable } from '@angular/core';
import { IEditPod } from '../interface/i-editPod';
import { IProductImg } from '../interface/i-product-img';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  masterPtoduct : IProductImg[] =[];
  proList: IProductImg[] = [];
  productDetail: IEditPod = {
    prod_id:0,
    prodName: '',
    imgUrl: [],
    public: "1",
    dsc: '',
    price: 0,
    salsePrice: 0,
    score: 0,
    ranking:0,
    qty: 0,
    web_id: 0,
    prodCover_id: 0,
    isActive : 1,
    productdsc: ''
  };
  uploadImgModel = false;
  productId = -1;
  constructor() { }

  setProductImg(podimg): void {
    this.proList = [];
    this.proList = podimg;
    this.masterPtoduct = podimg;
  }

}
