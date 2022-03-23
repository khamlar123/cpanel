import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private depamentInfoUrl = this.service.getEnpoin() + '/api/departmentInfo.api.php';
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

  loadAllDepamentInfo(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.depamentInfoUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteDepamentInfo(id: string, method: string):Observable<any>{
    const pram = {
      "dpId":id
    }
    return this.http.post(this.depamentInfoUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateDepamentInfo(modal, method: string):Observable<any>{
    return this.http.post(this.depamentInfoUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addDepamentInfo(modal, method: string):Observable<any>{
    return this.http.post(this.depamentInfoUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetailDepamentInfo(id, method: string):Observable<any>{
    const pram ={
      "dpId":id
    }
    return this.http.post(this.depamentInfoUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }
}
