import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private empoloyeeUrl = this.service.getEnpoin() + '/api/employee.api.php';
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

  getEmployee(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.empoloyeeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteEmployee(method: string , id: string):Observable<any>{
    const pram = {
      "emId":id
    }
    return this.http.post(this.empoloyeeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateEmployee(modal,method: string):Observable<any>{
    return this.http.post(this.empoloyeeUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addEmployee(modal, method: string):Observable<any>{
    return this.http.post(this.empoloyeeUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetail(id: string , method: string):Observable<any>{
    const pram = {
      "emId":id
    }
    return this.http.post(this.empoloyeeUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

}
