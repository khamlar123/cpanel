import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticeViewModueService {

  noticeList: any[] = [];
  noticeId: number = -1;
  masterNotice : any[] = []; 
  noticeDetail: {
    dsc: string;
    imgUrl: any;
    notice_id: number;
    title: string;
    web_id: number;
} = {
    dsc: "",
    imgUrl: "",
    notice_id: 0,
    title: "",
    web_id: 0,
  }

  constructor() { }

  setNotice(nt): void{
    this.noticeList = [];
    this.noticeList = nt;
    this.masterNotice = nt
  }

  resetNotice():void{
    
    const reset = {
      dsc: "",
      imgUrl: "",
      notice_id: 0,
      title: "",
      web_id: 0,
    }
    this.noticeDetail = reset;

  }


}
