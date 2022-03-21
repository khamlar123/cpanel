import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getEnpoin(): string{
    return 'http://216.127.173.163/website';
     //return 'http://216.127.173.163/oudomxay';
   // return 'http://216.127.173.163/louangnamtha';
  }
}
