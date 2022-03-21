import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VmService {
  bannerId = -1;
  bannerDetail: {
    bann_id: string;
    imgUrl: any;
    orderIndex: string;
    ref_id: string;
    web_id: string;
    dsc : string;
  } = {
    bann_id:'',
    imgUrl: '',
    orderIndex: '',
    ref_id: '',
    web_id: '',
    dsc : ''
  }

  bannerList: {
    bann_id: string;
    imgUrl: string
    orderIndex: string;
    ref_id: number;
    web_id: number;
    dsc: string;
  }[] =[];
  constructor() { }

  resetBannerDetail():void{
    const reset : any={
      bann_id:'',
      imgUrl: '',
      orderIndex: '',
      ref_id: '',
      web_id: ''
    }

    this.bannerDetail = reset;

}
}
