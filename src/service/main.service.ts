import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getEnpoin(): string {
    return 'http://psldoic.gov.la/website';
     //return 'http://odxdoic.gov.la/oudomxay';
    // return 'http://lntdoic.gov.la/louangnamtha';


  }


  getImgUrl(): string{
      return 'http://psldoic.gov.la/';
    //return 'http://odxdoic.gov.la/';
     // return 'http://lntdoic.gov.la/';
  }
}
