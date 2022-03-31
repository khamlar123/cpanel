import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userUrl = this.service.getEnpoin() + '/api/user.api.php';
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

  loadAllUser(method: string): Observable<any> {
    const pram = {};
    return this.http.post(this.userUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  deleteUser(id: string, method: string): Observable<any> {
    const pram = {
      user_id: id
    };
    return this.http.post(this.userUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  updateUser(modal, method: string): Observable<any> {
    return this.http.post(this.userUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  addUser(modal, method: string): Observable<any> {
    return this.http.post(this.userUrl, modal, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }

  getDetaiUser(id, method: string): Observable<any> {
    const pram = {
      user_id: id
    };
    return this.http.post(this.userUrl, pram, { headers: this.header(method) })
      .pipe(catchError((err) => of('server error')));
  }


}
