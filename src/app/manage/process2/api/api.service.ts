import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private processtUrl = this.service.getEnpoin() + '/api/process.api.php';
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

  getProcess(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.processtUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteProcess(method: string , id: string):Observable<any>{
    const pram = {
      "prId":id
    }
    return this.http.post(this.processtUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateProcess(modal,method: string):Observable<any>{
    return this.http.post(this.processtUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addProcess(modal, method: string):Observable<any>{
    return this.http.post(this.processtUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetail(id: string , method: string):Observable<any>{
    const pram = {
      "prId":id
    }
    return this.http.post(this.processtUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

}
