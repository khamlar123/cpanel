import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private StatisticsUrl = this.service.getEnpoin() + '/api/statistics.api.php';
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

  loadAllStatistics(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.StatisticsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteStatistics(id: string, method: string):Observable<any>{
    const pram = {
      "stId":id
    }
    return this.http.post(this.StatisticsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateStatistics(modal, method: string):Observable<any>{
    return this.http.post(this.StatisticsUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addStatistics(modal, method: string):Observable<any>{
    return this.http.post(this.StatisticsUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetailStatistics(id, method: string):Observable<any>{
    const pram ={
      "stId":id
    }
    return this.http.post(this.StatisticsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }


}
