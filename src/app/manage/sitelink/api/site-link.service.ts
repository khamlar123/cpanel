import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class SiteLinkService {
  private siteLinkUrl = this.service.getEnpoin() + '/api/sitelinks.api.php';
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

  loadAllSiteLink(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.siteLinkUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteSiteLink(id: string, method: string):Observable<any>{
    const pram = {
      "slid":id
    }
    return this.http.post(this.siteLinkUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateSiteLink(modal, method: string):Observable<any>{
    return this.http.post(this.siteLinkUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addSiteLink(modal, method: string):Observable<any>{
    return this.http.post(this.siteLinkUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetailSiteLink(id, method: string):Observable<any>{
    const pram ={
      "slid":id
    }
    return this.http.post(this.siteLinkUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }


}
