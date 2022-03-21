import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from 'src/service/main.service';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private noticeUrl = this.service.getEnpoin() + '/api/notice.api.php';
  constructor(
    private http: HttpClient,
    private service: MainService
    ) { }

  protected header(method: string):any{
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({'content-type': 'application/json'})
    .set('token', token+'')
    .set('method', method);
    return headers;
  }


  notice(method: string):Observable<any>{
 
    const pram = {
    }
    return this.http.post(this.noticeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteNotice(id: string, method: string):Observable<any>{
    const pram = {
      "notice_id":id
    }
    return this.http.post(this.noticeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateNotice(modal, method: string):Observable<any>{
    return this.http.post(this.noticeUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addNotice(modal, method: string):Observable<any>{
    return this.http.post(this.noticeUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetailNotice(id, method: string):Observable<any>{
    const pram ={
      "notice_id":id
    }
    return this.http.post(this.noticeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }


}
