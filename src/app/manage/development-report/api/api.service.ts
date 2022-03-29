import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private AssistanceUrl = this.service.getEnpoin() + '/api/assistance.api.php';
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

  loadAllAssistanceUrl(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.AssistanceUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteAssistanceUrl(id: string, method: string):Observable<any>{
    const pram = {
      "asId":id
    }
    return this.http.post(this.AssistanceUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateAssistanceUrl(modal, method: string):Observable<any>{
    return this.http.post(this.AssistanceUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addAssistanceUrl(modal, method: string):Observable<any>{
    return this.http.post(this.AssistanceUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetailAssistanceUrl(id, method: string):Observable<any>{
    const pram ={
      "asId":id
    }
    return this.http.post(this.AssistanceUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }


}
