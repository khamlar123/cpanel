import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private newsUrl = this.service.getEnpoin() + '/api/news.api.php';
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

  getNews(method: string):Observable<any>{
    const pram = {

    }
    return this.http.post(this.newsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  deleteNew(method: string , id: string):Observable<any>{
    const pram = {
      "news_id":id
    }
    return this.http.post(this.newsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  updateNews(modal,method: string):Observable<any>{
    return this.http.post(this.newsUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  addNews(modal, method: string):Observable<any>{
    return this.http.post(this.newsUrl,modal, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  getDetail(id: string , method: string):Observable<any>{
    const pram = {
      "news_id":id
    }
    return this.http.post(this.newsUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')))
  }

  


}
