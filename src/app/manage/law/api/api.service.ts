import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private lawUrl = this.service.getEnpoin() + '/api/documents.api.php';
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

  loadAllLaw(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.lawUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteLaw(id: string, method: string): Observable<any> {
    const pram = {
      docId: id
    };
    return this.http.post(this.lawUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateLaw(modal, method: string): Observable<any> {
    return this.http.post(this.lawUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addLaw(modal, method: string): Observable<any> {
    return this.http.post(this.lawUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetailLaw(id, method: string): Observable<any> {
    const pram = {
      docId: id
    };
    return this.http.post(this.lawUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
