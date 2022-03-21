import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class BannerApiService {
  private bannerUrl = this.service.getEnpoin() + '/api/banner.api.php';
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

  banner(method: string):Observable<any>{
 
    const pram = {
      // "page":1,
      // "limit":10,
      // "keyword":"1"
    }
    return this.http.post(this.bannerUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getbannerDetail(id: string, method: string):Observable<any>{
    const pram = {
      "bann_id":id
    }
    return this.http.post(this.bannerUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteBanner(id: string, method: string):Observable<any>{
    const pram = {
      "bann_id":id
    }
    return this.http.post(this.bannerUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateBanner(modal, method: string):Observable<any>{
    return this.http.post(this.bannerUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addBanner(modal, method: string):Observable<any>{
    return this.http.post(this.bannerUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

}
