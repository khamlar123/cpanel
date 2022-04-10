import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private CouncilUrl = this.service.getEnpoin() + '/api/council.api.php';
  constructor(
    private http: HttpClient,
    private service: MainService
  ) { }

  protected header(method: string): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'content-type': 'application/json' })
      .set('token', token + '')
      .set('method', method);
    return headers;
  }

  loadAllCouncil(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.CouncilUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteCouncil(id: string, method: string): Observable<any> {
    const pram = {
      cou_id: id
    };
    return this.http.post(this.CouncilUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateCouncil(modal, method: string): Observable<any> {
    return this.http.post(this.CouncilUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addCouncil(modal, method: string): Observable<any> {
    return this.http.post(this.CouncilUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetailCouncil(id, method: string): Observable<any> {
    const pram = {
      cou_id: id
    };
    return this.http.post(this.CouncilUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
