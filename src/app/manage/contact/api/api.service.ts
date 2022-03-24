import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private contactUrl = this.service.getEnpoin() + '/api/departmentContact.api.php';
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

  getContact(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.contactUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteContact(method: string , id: string):Observable<any>{
    const pram = {
      "dpcId":id
    }
    return this.http.post(this.contactUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateContact(modal,method: string):Observable<any>{
    return this.http.post(this.contactUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addContact(modal, method: string):Observable<any>{
    return this.http.post(this.contactUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetail(id: string , method: string):Observable<any>{
    const pram = {
      "dpcId":id
    }
    return this.http.post(this.contactUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

}
